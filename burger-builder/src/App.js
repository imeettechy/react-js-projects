import React, { Suspense, useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Routes, Navigate } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

const App = (props) => {
  const { onTryAutoSignup } = props;
  
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Routes>
      <Route path="/" element={<BurgerBuilder />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  if (props.isAuth) {
    routes = (
      <Routes>
        <Route path="/" element={<BurgerBuilder />} />
        <Route path="/checkout/*" element={<Checkout />} />
        <Route path="/orders/*" element={<Orders />} />
        <Route path="/logout/*" element={<Logout />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
