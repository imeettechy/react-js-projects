import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import withRouter from '../../hoc/withRouter/withRouter';
import { Route, Routes, Navigate } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';


class Checkout extends Component {

    componentWillMount() {
        // this.props.onInitPurchase();
    }
    /*
    componentWillMount() {
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
        */

    checkoutCancelledHander = () => {
        this.props.router.navigate(-1);
    }

    checkoutContinuedHander = () => {
        this.props.router.navigate('/checkout/contact-data', { replace: true });
    }

    render() {
        let summary = <Navigate to='/'/>
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Navigate to='/'/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        onCheckoutCancelled={this.checkoutCancelledHander}
                        onCheckoutContinued={this.checkoutContinuedHander}/>
                    <Routes>
                        <Route 
                            path='/contact-data'
                            element={<ContactData />} />
                    </Routes>
                </div>
            );
        }
        return (
            summary
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    };
}

export default connect(mapStateToProps)(withRouter(Checkout));