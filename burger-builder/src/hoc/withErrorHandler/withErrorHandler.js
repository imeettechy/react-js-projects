import React from "react";

import Model from "../../components/UI/Model/Model";
import Aux from "../Auxliary/Auxliary";
import useHttpErrorHandler from './../../hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    
    const [error, clearError] = useHttpErrorHandler(axios);
    
    return (
      <Aux>
        <Model show={error} modelClosed={clearError}>
          {error ? error.message : null}
        </Model>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
