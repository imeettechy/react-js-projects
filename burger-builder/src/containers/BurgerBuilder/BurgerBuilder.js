import React, { useState, useEffect, useCallback } from "react";
import Aux from "../../hoc/Auxliary/Auxliary";

import { connect, useDispatch, useSelector } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "./../../axios-orders";
import withRouter from "../../hoc/withRouter/withRouter";
import * as actions from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });

  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });

  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });

  const isAuth = useSelector((state) => {
    return state.auth.token !== null;
  });

  const onIngredientAdded = (ingName) =>
    dispatch(actions.addIngredient(ingName));
  const onIngredientsRemoved = (ingName) =>
    dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (updatedIngredients) => {
    const sum = Object.keys(updatedIngredients)
      .map((ipKey) => {
        return updatedIngredients[ipKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      });

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuth) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.router.navigate({
        pathname: "/auth",
      });
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.router.navigate({
      pathname: "/checkout",
    });
  };

  const disabledInfo = {
    ...ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded..</p> : <Spinner />;

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          burgerPrice={price}
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientsRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuth}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        totalPrice={price}
        ingredients={ings}
        purchaseCancled={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Model show={purchasing} modelClosed={purchaseCancelHandler}>
        {orderSummary}
      </Model>
      {burger}
    </Aux>
  );
};

/*
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientsRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withErrorHandler(BurgerBuilder, axios)));
*/

export default withRouter(withErrorHandler(BurgerBuilder, axios));
