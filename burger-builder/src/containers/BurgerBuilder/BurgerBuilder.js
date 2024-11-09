import { Component } from "react";
import Aux from "../../hoc/Auxliary/Auxliary";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 4,
        purchasable :  false,
        purchasing : false
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
        alert("GO GO GO");
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Model show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        totalPrice={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        purchaseCancled={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        />
                </Model>
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
    }
}

export default BurgerBuilder;