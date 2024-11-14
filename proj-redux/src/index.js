import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import reducer from './store/reducer';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';


const rootReducer = combineReducers({
  ctr : counterReducer,
  res : resultReducer
})

const logger = (store) => {
  return next => {
    return action => {
      console.log('Middleware dispatching => ', action);
      const result = next(action);
      console.log('Middleware Next state => ', store.getState());
      return result;
    }
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
