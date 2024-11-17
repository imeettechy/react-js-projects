import React, { useState } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "./../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withRouter from "../../../hoc/withRouter/withRouter";
import Input from "../../../components/UI/Input/Input";
import { elementType } from "prop-types";
import CHECKOUT_JSON from "./../../../constants/formControls/checkout.json";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "./../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

import { connect } from "react-redux";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState(CHECKOUT_JSON);
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formEleIf in orderForm) {
      formData[formEleIf] = orderForm[formEleIf].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onBurgerOrder(order, props.token);
  };

  const inputChangedHandler = (event, inputId) => {
    const updatedFormEl = updateObject(orderForm[inputId], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputId].validation),
      touched: true,
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputId]: updatedFormEl,
    });

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formEleArray = [];
  for (let key in orderForm) {
    formEleArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formEleArray.map((forEle) => (
        <Input
          key={forEle.id}
          elementType={forEle.config.elementType}
          elementConfig={forEle.config.elementConfig}
          value={forEle.config.value}
          changed={(event) => inputChangedHandler(event, forEle.id)}
          invalid={!forEle.config.valid}
          shouldValidate={forEle.config.validation}
          touched={forEle.config.touched}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        Order
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter Your data..</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerOrder: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withErrorHandler(ContactData, axios)));
