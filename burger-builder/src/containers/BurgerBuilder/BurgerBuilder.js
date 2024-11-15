import { Component } from "react";
import Aux from "../../hoc/Auxliary/Auxliary";
import { Navigate } from 'react-router-dom';

import { connect } from 'react-redux';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from './../../axios-orders';
import withRouter from "../../hoc/withRouter/withRouter";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }
    state = {
        purchasing : false
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    /*
    addIngredienthandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }
    */

    updatePurchaseState(updatedIngredients) {

        const sum = Object.keys(updatedIngredients)
                        .map(ipKey => {
                            return updatedIngredients[ipKey]
                        })
                        .reduce((sum, el) => {
                            return sum + el;
                        });

        // this.setState({ purchasable : sum > 0 });
        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState({purchasing : true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.router.navigate({
                pathname: '/auth',
            });
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for(let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString = queryParams.join('&');
        this.props.onInitPurchase();
        this.props.router.navigate({
            pathname: '/checkout',
            // search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded..</p> :  <Spinner />;

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        burgerPrice = {this.props.price}
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientsRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth}
                        />
                </Aux>
            );
            orderSummary = <OrderSummary 
                                totalPrice={this.props.price}
                                ingredients={this.props.ings}
                                purchaseCancled={this.purchaseCancelHandler}
                                purchaseContinue={this.purchaseContinueHandler}
                                />;
        }

        return (
            <Aux>
                <Model show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Model>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuth : state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientsRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)));