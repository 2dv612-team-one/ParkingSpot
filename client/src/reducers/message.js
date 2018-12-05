/* eslint import/no-webpack-loader-syntax: off */
import {
  SHOW_MESSAGE,
  SEND_MESSAGE
} from '../constants/actionTypes';

const initialState = {
  message: null,
  showError: null, // TODO: use another variable for messages
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return { ...state, message: action.payload.body, showError: true };
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${SEND_MESSAGE}_FULFILLED`:
      return { ...state, message: action.payload.body, showError: true };
    case `${SEND_MESSAGE}_REJECTED`:
      return { ...state, message: action.payload.body, showError: true };    
    case `${SEND_MESSAGE}_PENDING`:
      return { ...state};
    default:
      return state;
  }
};
