import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from './../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import withRouter from "../../../hoc/withRouter/withRouter";
import Input from "../../../components/UI/Input/Input";
import { elementType } from "prop-types";
import CHECKOUT_JSON from "./../../../constants/formControls/checkout.json";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as  orderActions from './../../../store/actions/index';
import { updateObject, checkValidity } from "../../../shared/utility";

import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm : CHECKOUT_JSON,
        formIsValid : false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formEleIf in this.state.orderForm) {
            formData[formEleIf] = this.state.orderForm[formEleIf].value;
        }

        const order = {
            ingredients : this.props.ings,
            price : this.props.price,
            orderData : formData,
            userId : this.props.userId
        }

        this.props.onBurgerOrder(order, this.props.token);
        
        // this.props.router.navigate('/');
            
    }

    inputChangedHandler = (event, inputId) => {

        const updatedFormEl = updateObject(this.state.orderForm[inputId], {
            value : event.target.value,
            valid : checkValidity(event.target.value, this.state.orderForm[inputId].validation),
            touched : true
        }) ;
        
        const updatedOrderForm = updateObject(this.state.orderForm, updatedFormEl);

        let formIsValid = true;
        for(let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }

        this.setState({ orderForm : updatedOrderForm, formIsValid : formIsValid });
    }

    render() {

        const formEleArray = [];
        for (let key in this.state.orderForm) {
            formEleArray.push({
                id : key,
                config : this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formEleArray.map(forEle => (
                    <Input 
                        key={forEle.id}
                        elementType={forEle.config.elementType} 
                        elementConfig={forEle.config.elementConfig} 
                        defaultValue={forEle.config.value} 
                        changed={(event) => this.inputChangedHandler(event, forEle.id)}
                        invalid={!forEle.config.valid}
                        shouldValidate={forEle.config.validation}
                        touched={forEle.config.touched}
                        />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your data..</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder : (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withErrorHandler(ContactData,axios)));