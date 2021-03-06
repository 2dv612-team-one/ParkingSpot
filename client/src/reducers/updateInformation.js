/* eslint import/no-webpack-loader-syntax: off */
import {
    UPDATE_USER_PASSWORD,
    UPDATE_USER_EMAIL,
  } from '../constants/actionTypes';

  
  const initialState = {
    message: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case `${UPDATE_USER_PASSWORD}_FULFILLED`:
        return { ...state, message: action.payload};
        case `${UPDATE_USER_PASSWORD}_PENDING`:
        return { ...state};
        case `${UPDATE_USER_PASSWORD}_REJECTED`:
        return { ...state};
        case `${UPDATE_USER_EMAIL}_FULFILLED`:
        return { ...state, message: action.payload};
        case `${UPDATE_USER_EMAIL}_PENDING`:
        return { ...state};
        case `${UPDATE_USER_EMAIL}_REJECTED`:
        return { ...state};
      default:
        return state;
    }
  };
  