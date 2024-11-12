import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Routes } from 'react-router-dom';
import withRouter from './hoc/withRouter/withRouter';
import Orders from "./containers/Orders/Orders";

class App extends Component{
  render() {
    return (
      <div >
        <Layout>
          <Routes>
            <Route path="/" element={<BurgerBuilder />} />
            <Route path="/checkout/*" element={<Checkout />} />
            <Route path="/orders/*" element={<Orders />} />
          </Routes>
        </Layout>
      </div>
    );
  }
}
  
export default App;
