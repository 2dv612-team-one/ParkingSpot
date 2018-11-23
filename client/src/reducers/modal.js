/* eslint import/no-webpack-loader-syntax: off */
import {
    USER_AUTHENTICATION,
    OPEN_MODAL,
    CLOSE_MODAL,
  } from '../constants/actionTypes';
  import {
    LOGIN_MODAL,
    REGISTER_MODAL
  } from '../constants/environment';
  
  
  const initialState = {
    [LOGIN_MODAL]: false,
    [REGISTER_MODAL]: false,
  }
  
  export default (state = initialState, action) => {
    switch(action.type) {
      case OPEN_MODAL:
        return { ...state, [action.content]: true }
      case CLOSE_MODAL:
            return { ...state, [LOGIN_MODAL]: false, [REGISTER_MODAL]: false, }
      case USER_AUTHENTICATION + '_FULFILLED':
        return { ...state, [LOGIN_MODAL]: false, }
      default:
        return state;
    }
  }