import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx'
import store from './store';
import { increment, decrement, addformentity } from './actions';
import SimpleComponent from './components/SimpleComponent'
import PropTypes from 'prop-types';
import reducer from  './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';


  ReactDOM.render(
    // <App
    //   value={ store.getState().value }
    //   form={ store.getState().form }
    //   onIncrement={ () => store.dispatch(increment)}
    //   onDecrement={ () => store.dispatch(decrement)}
    //   addFormEntity={ () => store.dispatch(addformentity)}
    // />,
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
