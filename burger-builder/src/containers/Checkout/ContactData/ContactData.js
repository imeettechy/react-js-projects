import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";

import classes from './ContactData.module.css';
import axios from './../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import withRouter from "../../../hoc/withRouter/withRouter";

class ContactData extends Component {
    state = {
        name : '',
        email : '',
        address : {
            street : '',
            zipCode : '',
            country : ''
        },
        loading : false
    }

    orderHandler = () => {
        console.log(this.props.ingredients);

        this.setState({loading : true});
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
            customer : {
                name : 'Meet Thummar',
                address : {
                    street : 'Test Street',
                    pinCode : '395004',
                    country : 'India'
                },
                email : 'test@test.com',
            },
            deliveryMethod : 'Fast Delivery'
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

    render() {
        let form = (
            <form>
                    <input type="text" name="name" placeholder="your name" />
                    <input type="text" name="email" placeholder="your email" />
                    <input type="text" name="street" placeholder="your street" />
                    <input type="text" name="zipcode" placeholder="your zipcode" />
                    <input type="text" name="country" placeholder="your country" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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