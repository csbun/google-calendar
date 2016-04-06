import {
  REQUEST_AUTH,
  RECEIVE_AUTH_RESULT,
} from '../constants/auth';

export default function (state = {}, action) {
  switch (action.type) {
    case REQUEST_AUTH:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_AUTH_RESULT:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
      });
    default:
      return state;
  }
}
