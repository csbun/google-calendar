import React from 'react';
import { connect } from 'react-redux';
import auth from '../actions/auth';
import {
  LS_KEY_CLIENT_ID,
  LS_KEY_API_KEY,
} from '../constants/auth';

// const mapDispatchToProps = dispatch => ({
//   onAuthClick: (clientId, apiKey) => {
//
//   },
// });


let Auth = ({ dispatch }) => {
  let refInputClientId;
  let refInputApiKey;
  let clientId = localStorage.getItem(LS_KEY_CLIENT_ID) || '';
  let apiKey = localStorage.getItem(LS_KEY_API_KEY) || '';
  return (
    <div>
      <div>
        <label>clientId</label>
        <input ref={node => { refInputClientId = node; refInputClientId.value = clientId; }} />
      </div>
      <div>
        <label>apiKey</label>
        <input ref={node => { refInputApiKey = node; refInputApiKey.value = apiKey; }} />
      </div>
      <div>
        <button onClick={e => {
          e.preventDefault();
          clientId = refInputClientId.value;
          apiKey = refInputApiKey.value;
          localStorage.setItem(LS_KEY_CLIENT_ID, clientId);
          localStorage.setItem(LS_KEY_API_KEY, apiKey);
          dispatch(auth(clientId, apiKey));
        }}>Auth</button>
      </div>
    </div>
  );
};
Auth = connect()(Auth);

export default Auth;
