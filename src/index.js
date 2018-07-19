import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import reducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// import { batchActions, enableBatching, batchDispatchMiddleware } from 'redux-batched-actions';
import formValidator from './middleware/formValidator';

// Implementation of Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, formValidator)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
