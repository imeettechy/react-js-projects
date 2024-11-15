import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Routes, Navigate } from 'react-router-dom';
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import withRouter from "./hoc/withRouter/withRouter";

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  
  render() {

    let routes = (
      <Routes>
        <Route path="/" element={<BurgerBuilder />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    );

    if(this.props.isAuth){
      routes = (
        <Routes>
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="/checkout/*" element={<Checkout />} />
          <Route path="/orders/*" element={<Orders />} />
          <Route path="/logout/*" element={<Logout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    }
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuth : state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onTryAutoSignup : () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
