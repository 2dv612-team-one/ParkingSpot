/* eslint import/no-webpack-loader-syntax: off */
import {
  SHOW_MESSAGE,
  SEND_MESSAGE,
  CLOSE_SNACKBAR,
  MARK_MESSAGE_VIEWED,
} from '../constants/actionTypes';

const initialState = {
  message: {id: null, message: ''},
  showInfo: null, // TODO: use another variable for messages
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      let msg = '';
      try {
        msg = JSON.parse(action.payload.body);
        return { ...state, message: msg, showInfo: true };
      } catch {
        return { ...state };
      }
    case `${SEND_MESSAGE}_FULFILLED`:
      return { ...state, message: action.payload.body, showInfo: true };
    case `${SEND_MESSAGE}_REJECTED`:
      return { ...state };
    case `${SEND_MESSAGE}_PENDING`:
      return { ...state };
    case `${MARK_MESSAGE_VIEWED}_FULFILLED`:
      return { ...state, message: initialState.message, showInfo: false };
    case CLOSE_SNACKBAR:
      return { ...state, message: initialState.message, showInfo: false };
    default:
      return state;
  }
};