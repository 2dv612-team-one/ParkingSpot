// TODO: There are duplicate reducers, is that really necessary?
import { combineReducers } from 'redux';

import authentication from './reducers/authentication';
import error from './reducers/error';
import message from './reducers/message';
import modal from './reducers/modal';
import parkingArea from './reducers/parkingArea';
import registration from './reducers/registration';
import success from './reducers/success';
import updateInformation from './reducers/updateInformation';
import userController from './reducers/userController';
import vehicle from './reducers/vehicle';
import parking from './reducers/parking';

export default combineReducers({
  authentication,
  error,
  message,
  modal,
  parkingArea,
  registration,
  success,
  updateInformation,
  userController,
  vehicle,
  parking
});