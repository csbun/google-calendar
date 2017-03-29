import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import ifAuth from './containers/ifAuth';
import auth from './actions/auth';

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware) // lets us dispatch() functions
);

console.log(ifAuth);


const App = () => {
  console.log('app');
  // let ctx = isAuth ? (<div>isAuth</div>) : (<Auth />);
  // return (<div>{ctx}</div>);
  return <div><ifAuth /></div>;
};


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

// 进入即进行授权
import {
  LS_KEY_CLIENT_ID,
  LS_KEY_API_KEY,
} from './constants/auth';
// API Client Library for JavaScript (Beta) onload callback
// See: https://developers.google.com/api-client-library/javascript/start/start-js
window._jsAPIClintOnLoad = () => {
  const clientId = localStorage.getItem(LS_KEY_CLIENT_ID) || '';
  const apiKey = localStorage.getItem(LS_KEY_API_KEY) || '';
  if (clientId && apiKey) {
    store.dispatch(auth(clientId, apiKey));
  }
};
