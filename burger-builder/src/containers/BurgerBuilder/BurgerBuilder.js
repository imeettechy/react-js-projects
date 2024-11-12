import { Component } from "react";
import Aux from "../../hoc/Auxliary/Auxliary";
import { Navigate } from 'react-router-dom';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from './../../axios-orders';
import withRouter from "../../hoc/withRouter/withRouter";

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }
    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable :  false,
        purchasing : false,
        loading : false,
        error : false
    }

    componentDidMount () {
        console.log(this.props);
        axios.get("/ingredients.json")
            .then(response => {
                this.setState({ ingredients : response.data });
            })
            .catch(error => {
                this.setState({ error : true });
            });
    }

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

    updatePurchaseState(updatedIngredients) {

        const sum = Object.keys(updatedIngredients)
                        .map(ipKey => {
                            return updatedIngredients[ipKey]
                        })
                        .reduce((sum, el) => {
                            return sum + el;
                        });

        this.setState({ purchasable : sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        // alert("GO GO GO");
        // this.setState({loading : true});
        // const order = {
        //     ingredients : this.state.ingredients,
        //     price : this.state.totalPrice,
        //     customer : {
        //         name : 'Meet Thummar',
        //         address : {
        //             street : 'Test Street',
        //             pinCode : '395004',
        //             country : 'India'
        //         },
        //         email : 'test@test.com',
        //     },
        //     deliveryMethod : 'Fast Delivery'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading : false, purchasing : false });
        //     })
        //     .catch(error => {
        //         this.setState({ loading : false, purchasing : false });
        //     });
        // <Navigate to="/checkout"/>
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.router.navigate({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded..</p> :  <Spinner />;

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        burgerPrice = {this.state.totalPrice}
                        ingredientAdded = {this.addIngredienthandler}
                        ingredientRemoved = {this.removeIngredientsHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        />
                </Aux>
            );
            orderSummary = <OrderSummary 
                                totalPrice={this.state.totalPrice}
                                ingredients={this.state.ingredients}
                                purchaseCancled={this.purchaseCancelHandler}
                                purchaseContinue={this.purchaseContinueHandler}
                                />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
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

export default withRouter(withErrorHandler(BurgerBuilder, axios));