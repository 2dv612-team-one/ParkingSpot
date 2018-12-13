/* eslint import/no-webpack-loader-syntax: off */
// TODO: There are duplicate reducers, is that really necessary?
import { combineReducers } from 'redux';

import authentication from './reducers/authentication';
import error from './reducers/error';
import message from './reducers/message';
import modal from './reducers/modal';
import parkingArea from './reducers/parkingArea';
import registration from './reducers/registration';
import snackbar from './reducers/snackbar';
import success from './reducers/success';
import updateInformation from './reducers/updateInformation';
import userController from './reducers/userController';
import vehicle from './reducers/vehicle';

export default combineReducers({
  authentication,
  error,
  message,
  modal,
  parkingArea,
  registration,
  snackbar,
  success,
  updateInformation,
  userController,
  vehicle,
});