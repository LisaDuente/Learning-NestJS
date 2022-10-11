import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureStore, createStore} from '@reduxjs/toolkit'

//ACTIONS (returns an object for switchcase in reducer)
const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}

//REDUCER
const counter = (state=0, action) => {
  switch(action.type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
  }
}

//STORAGE (is a globalized state for all react components to reach)
//create a storage with a reducer which action can be dispatched depending on the type of action
let store = createStore(counter);

store.subscribe(() => console.log(store.getState()));

//DISPATCH
//dispatch the action to increment the storage state
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
