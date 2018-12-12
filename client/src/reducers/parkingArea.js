/* eslint import/no-webpack-loader-syntax: off */
import {
    ADD_PARKING_AREA,
    GET_PARKING_AREAS,
    DELETE_PARKING_AREA
  } from '../constants/actionTypes';
  
  const initialState = {
    data: [],
    message: null,
    update: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case `${GET_PARKING_AREAS}_FULFILLED`:
        return { ...state, data: action.payload.data, update: false };

      case `${ADD_PARKING_AREA}_FULFILLED`:
        return { ...state, data: action.payload.data, update: true }; 
      case `${ADD_PARKING_AREA}_PENDING`:
        return { ...state };
      case `${ADD_PARKING_AREA}_REJECTED`:
        return { ...state, message: action.payload };

      case `${DELETE_PARKING_AREA}_FULFILLED`:
        return { ...state, message: action.payload, update: true };
      case `${DELETE_PARKING_AREA}_PENDING`:
        return { ...state };
      case `${DELETE_PARKING_AREA}_REJECTED`:
        return { ...state, message: action.payload };

      default:
        return state;
    }
  };
