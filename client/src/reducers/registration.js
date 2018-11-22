/* eslint import/no-webpack-loader-syntax: off */
import {
    USER_REGISTRATION,
  } from '../constants/actionTypes';
  import {
    REGISTER_MODAL
  } from '../constants/environment';
  
  
  const initialState = {
    message: null,
  }
  
  export default (state = initialState, action) => {
    switch(action.type) {
      case USER_REGISTRATION + '_PENDING':
        return { ...state }
      case USER_REGISTRATION + '_REJECTED':
        return { ...state, message: action.payload }
      case USER_REGISTRATION + '_FULFILLED':
        return {...state, message: action.payload, [REGISTER_MODAL]: false}
      default:
        return state;
    }
  }
  