import {
    ADD_PARKING_AREA,
    GET_PARKING_AREAS,
    DELETE_PARKING_AREA,
    EDIT_PARKING_AREA,
    ADD_PARKING_AREA_RATES,
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

      case `${EDIT_PARKING_AREA}_FULFILLED`:
        return { ...state, message: action.payload, update: true };
      case `${EDIT_PARKING_AREA}_PENDING`:
        return { ...state };
      case `${EDIT_PARKING_AREA}_REJECTED`:
        return { ...state, message: action.payload };

      case `${ADD_PARKING_AREA_RATES}_FULFILLED`:
        return { ...state, message: action.payload, update: true };
      case `${ADD_PARKING_AREA_RATES}_PENDING`:
        return { ...state };
      case `${ADD_PARKING_AREA_RATES}_REJECTED`:
        return { ...state, message: action.payload };

      default:
        return state;
    }
  };
