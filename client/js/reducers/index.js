import { combineReducers } from 'redux';
import auth from './auth';
import calendars from './calendars';

const gcApp = combineReducers({
  auth,
  calendars,
});

export default gcApp;
