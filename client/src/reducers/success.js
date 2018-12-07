/* eslint import/no-webpack-loader-syntax: off */
import {
  REGISTER_USER,
  USER_REGISTRATION,
  CLOSE_SNACKBAR,
} from '../constants/actionTypes';

const initialState = {
  message: null,
  showSuccess: null,
};

const isSuccess = p => p.status >= 200 && p.status < 300;

const getInfo = (state, message) => ({ ...state, message, showSuccess: true });

export default (state = initialState, action) => {
  switch (action.type) {
    case `${REGISTER_USER}_FULFILLED`:
      if (isSuccess(action.payload)) {
        return getInfo(state, 'Kontot skapades.');
      }
      return initialState;
    case `${USER_REGISTRATION}_FULFILLED`:
      if (isSuccess(action.payload)) {
        return getInfo(state, 'Kontot skapades. Du måste nu bekräfta din e-postadress.');
      }
      return initialState;

    case CLOSE_SNACKBAR:
      return { ...state, message: null, showSuccess: false };
    default:
      return state;
  }
};