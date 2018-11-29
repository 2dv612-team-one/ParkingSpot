/* eslint import/no-webpack-loader-syntax: off */
import {
    GET_ROLES
  } from '../constants/actionTypes';
  
  const initialState = {
    roles: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {       
      case `${GET_ROLES}_FULFILLED`:
        return { ...state, roles: action.payload.data};
      case `${GET_ROLES}_PENDING`:
        return { ...state };
      default:    
        return state;
    }
  };
  