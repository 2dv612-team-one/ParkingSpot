/* eslint import/no-webpack-loader-syntax: off */
import {
  SHOW_MESSAGE,
  SEND_MESSAGE,
  CLOSE_SNACKBAR,
} from '../constants/actionTypes';

const initialState = {
  message: null,
  showInfo: null, // TODO: use another variable for messages
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return { ...state, message: action.payload.body, showInfo: true };
    case `${SEND_MESSAGE}_FULFILLED`:
      return { ...state, message: action.payload.body, showInfo: true };
    case `${SEND_MESSAGE}_REJECTED`:
      return { ...state };
    case `${SEND_MESSAGE}_PENDING`:
      return { ...state };
    case CLOSE_SNACKBAR:
      return { ...state, message: null, showInfo: false };
    default:
      return state;
  }
};