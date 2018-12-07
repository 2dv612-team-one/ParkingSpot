/* eslint import/no-webpack-loader-syntax: off */
// TODO: There are duplicate reducers, is that really necessary?
import { combineReducers } from 'redux';

import authentication from './reducers/authentication';
import registration from './reducers/registration';
import modal from './reducers/modal';
import vehicle from './reducers/vehicle';
import userController from './reducers/userController';
import parkingArea from './reducers/parkingArea';
import error from './reducers/error';
import success from './reducers/success';
import message from './reducers/message';

export default combineReducers({
  authentication,
  registration,
  modal,
  vehicle,
  userController,
  error,
  success,
  parkingArea,
  message,
});