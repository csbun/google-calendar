const scopes = 'https://www.googleapis.com/auth/plus.me';

import {
  REQUEST_AUTH,
  RECEIVE_AUTH_RESULT,
} from '../constants/auth';

function requestAuth(clientId, apiKey) {
  return {
    type: REQUEST_AUTH,
    clientId,
    apiKey,
  };
}

function receiveAuthResult(data) {
  console.log(data);
  return {
    type: RECEIVE_AUTH_RESULT,
    data,
  };
}

function startAuth(dispatch, clientId, apiKey) {
  // Step 2: Reference the API key
  gapi.client.setApiKey(apiKey);
  return new Promise((resolve) => {
    let handleAuthResult = null;
    function handleAuthClick() {
      // Step 3: get authorization to use private data
      gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false,
      }, handleAuthResult);
      return false;
    }
    handleAuthResult = authResult => {
      if (authResult && !authResult.error) {
        dispatch(receiveAuthResult(authResult));
        resolve();
      } else {
        handleAuthClick();
      }
    };
    setTimeout(() => {
      gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: true,
      }, handleAuthResult);
    }, 1);
  });
}


export default function auth(clientId, apiKey) {
  return dispatch => {
    dispatch(requestAuth(clientId, apiKey));
    return startAuth(dispatch, clientId, apiKey);
  };
}
