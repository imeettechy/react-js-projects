import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import withRouter from "../../hoc/withRouter/withRouter";
import { Route, Routes, Navigate } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

import { connect } from "react-redux";

const Checkout = (props) => {
  const checkoutCancelledHander = () => {
    props.router.navigate(-1);
  };

  const checkoutContinuedHander = () => {
    props.router.navigate("/checkout/contact-data", { replace: true });
  };

  let summary = <Navigate to="/" />;
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Navigate to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          onCheckoutCancelled={checkoutCancelledHander}
          onCheckoutContinued={checkoutContinuedHander}
        />
        <Routes>
          <Route path="/contact-data" element={<ContactData />} />
        </Routes>
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(withRouter(Checkout));
