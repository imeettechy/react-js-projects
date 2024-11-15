import * as actionTypes from './../actions/actionsTypes';
import { updateObject } from './../utility';

const INGREDIENT_PRICES = {
    salad : 10,
    cheese : 14,
    meat : 20,
    bacon : 12
}

const initialState = {
    ingredients : null,
    totalPrice : 40,
    error : false
}

const addIngrediet = (state, action) => {
    const updatedIngredient = { [action.ingredientName]  : state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients : updatedIngredients,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]  : state.ingredients[action.ingredientName] - 1 };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSta = {
        ingredients : updatedIngs,
        totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedSta);
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients : {
            salad : action.ingredients.salad,
            cheese : action.ingredients.cheese,
            bacon : action.ingredients.bacon,
            meat : action.ingredients.meat
        },
        totalPrice : 40,
        error : false
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS :
            return addIngrediet(state, action);
        case actionTypes.REMOVE_INGREDIENT :
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS :
            return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED :
            return updateObject(state, {error : true});
        default:
            return state;
    }
}

export default reducer;