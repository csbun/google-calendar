/**
 * Event Actions
 */
export const createEvent = (title) => ({
  type: 'CREATE_EVENT',
  title,
});

export const deleteEvent = id => ({
  type: 'DELETE_EVENT',
  id,
});

export const reloadEvents = (filter) => ({
  type: 'RELOAD_EVENTS',
  filter,
});


/**
 * Calendar Actions
 */
import {
  REQUEST_CALENDARS,
  RECEIVE_CALENDARS,
} from '../constants/calendar';

function requestCalendars() {
  return {
    type: REQUEST_CALENDARS,
  };
}

function receiveCalendars(resp) {
  return {
    type: RECEIVE_CALENDARS,
    data: resp,
  };
}

function fetchCalendars() {
  return dispatch => {
    dispatch(requestCalendars());
    // Step 4: Load the Google+ API
    gapi.client.load('plus', 'v1').then(() => {
      // Step 5: Assemble the API request
      const request = gapi.client.plus.people.get({
        userId: 'me',
      });
      // Step 6: Execute the API request
      request.then(resp => {
        receiveCalendars(resp);
        // const heading = document.createElement('h4');
        // const image = document.createElement('img');
        // image.src = resp.result.image.url;
        // heading.appendChild(image);
        // heading.appendChild(document.createTextNode(resp.result.displayName));
        //
        // document.getElementById('content').appendChild(heading);
      }, reason => {
        console.log(`Error: ${reason.result.error.message}`);
      });
    });
    // return new Promise((resolve, reject) => {
    //
    // });
  };
}

function shouldFetchCalendars(state) {
  if (!state) {
    return true;
  } else if (state.isFetching) {
    return false;
  }
  return state.didInvalidate;
}
