import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import withRouter from '../../hoc/withRouter/withRouter';
import { Route, Routes } from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

    state = {
        ingredients : null,
        totalPrice : 0
    }

    componentWillMount() {
        console.log(this.props);
        const query = new URLSearchParams(this.props.router.location.search);
        const ingredients = {};
        let price;
        for (let param of query.entries()) {
            if(param[0] === 'price'){
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ ingredients : ingredients, totalPrice : price });
    }

    checkoutCancelledHander = () => {
        this.props.router.navigate(-1);
    }

    checkoutContinuedHander = () => {
        this.props.router.navigate('/checkout/contact-data', { replace: true });
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHander}
                    onCheckoutContinued={this.checkoutContinuedHander}/>
                <Routes>
                    <Route 
                        path='/contact-data'
                        element={<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />} />
                </Routes>
            </div>
        )
    }
}

export default withRouter(Checkout);