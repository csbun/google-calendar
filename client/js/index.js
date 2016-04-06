import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';

import {
  auth,
} from './actions/auth';

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware) // lets us dispatch() functions
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

window.gcinit = () => {
  console.log('gcinit');
};
