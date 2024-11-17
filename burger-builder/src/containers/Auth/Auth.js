import React, { useState, useEffect } from "react";
import AUTH_CONTROLS from "./../../constants/formControls/auth.json";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import withRouter from "../../hoc/withRouter/withRouter";
import classes from "./Auth.module.css";
import * as actions from "./../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Navigate } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

import { connect } from "react-redux";

const Auth = (props) => {
  const [controls, setControls] = useState(AUTH_CONTROLS);
  const [isSignUp, setIsSignUp] = useState(true);

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath,onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      }),
    });

    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const formEleArray = [];
  for (let key in controls) {
    formEleArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formEleArray.map((forEle) => (
    <Input
      key={forEle.id}
      elementType={forEle.config.elementType}
      elementConfig={forEle.config.elementConfig}
      defaultValue={forEle.config.value}
      changed={(event) => inputChangedHandler(event, forEle.id)}
      invalid={!forEle.config.valid}
      shouldValidate={forEle.config.validation}
      touched={forEle.config.touched}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMsg = null;
  if (props.error) {
    errorMsg = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Navigate to={props.authRedirectPath} />;
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMsg}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
        <Button clicked={switchAuthModeHandler} btnType="Danger">
          SWITCH TO {isSignUp ? "SIGN IN" : "SIGN UP"}
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
