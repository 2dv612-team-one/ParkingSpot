/* eslint import/no-webpack-loader-syntax: off */
import {
    ADD_PARKING_AREA
  } from '../constants/actionTypes';
  
  const initialState = {
    data: [],
    message: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case `${ADD_PARKING_AREA}_FULFILLED`:
        return { ...state, data: action.payload.data }; 
      case `${ADD_PARKING_AREA}_PENDING`:
        return { ...state };
      case `${ADD_PARKING_AREA}_REJECTED`:
        return { ...state, message: action.payload };
      default:
        return state;
    }
  };
  