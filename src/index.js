import React from'react';
import ReactDOM from'react-dom';
import'./index.css';
import App from './App';
import reportWebVitals from'./reportWebVitals';
import {Provider, provider} from'react-redux';
import { createStore } from 'redux';
import{loaderReducer}from './redux/LoaderReducer'
const store =createStore(loaderReducer);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById("root")
);
reportWebVitals();