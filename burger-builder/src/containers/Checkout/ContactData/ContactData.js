import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";

import classes from './ContactData.module.css';
import axios from './../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import withRouter from "../../../hoc/withRouter/withRouter";
import Input from "../../../components/UI/Input/Input";
import { elementType } from "prop-types";
import CHECKOUT_JSON from "./../../../Constants/formControls/checkout.json";

class ContactData extends Component {
    state = {
        orderForm : CHECKOUT_JSON,
        formIsValid : false,
        loading : false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(!rules){
            return isValid;
        }

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formEleIf in this.state.orderForm) {
            formData[formEleIf] = this.state.orderForm[formEleIf].value;
        }

        this.setState({loading : true});
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
            orderData : formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading : false });
                this.props.router.navigate('/');
            })
            .catch(error => {
                this.setState({ loading : false });
            });
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormEl = {
            ...updatedOrderForm[inputId]
        };
        updatedFormEl.value = event.target.value;
        updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation);
        updatedFormEl.touched = true;
        updatedOrderForm[inputId] = updatedFormEl;


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
        if(this.state.loading){
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

export default withRouter(ContactData);