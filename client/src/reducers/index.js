// TODO: There are duplicate reducers, is that really necessary?
import { combineReducers } from 'redux';

import authentication from './authentication';
import registration from './registration';
import modal from './modal';
import vehicle from './vehicle';
import message from './message';

export default combineReducers({
  authentication,
  registration,
  modal,
  vehicle,
  message,
});
