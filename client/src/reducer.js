// TODO: There are duplicate reducers, is that really necessary?
import { combineReducers } from 'redux';

import authentication from './reducers/authentication';
import error from './reducers/error';
import message from './reducers/message';
import modal from './reducers/modal';
import parking from './reducers/parking';
import parkingArea from './reducers/parkingArea';
import registration from './reducers/registration';
import success from './reducers/success';
import updateInformation from './reducers/updateInformation';
import userController from './reducers/userController';
import vehicle from './reducers/vehicle';
import warning from './reducers/warning';

export default combineReducers({
  authentication,
  error,
  message,
  modal,
  parking,
  parkingArea,
  registration,
  success,
  updateInformation,
  userController,
  vehicle,
  warning,
});