import {
  ADD_CAR,
  GET_CARS,
  DELETE_CAR,
  PARK_CAR
} from '../constants/actionTypes';

const initialState = {
  data: [],
  message: null,
  fetch: true,
  update: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_CARS}_FULFILLED`:
      return { ...state, data: action.payload.data, fetch: false };

    case `${ADD_CAR}_PENDING`:
      return { ...state };
    case `${ADD_CAR}_REJECTED`:
      return { ...state, message: action.payload };
    case `${ADD_CAR}_FULFILLED`:
      return { ...state, message: action.payload, update: true, fetch: true };
    case `${DELETE_CAR}_FULFILLED`:
      return { ...state, message: action.payload, update: true };
    case `${DELETE_CAR}_PENDING`:
      return { ...state };
    case `${DELETE_CAR}_REJECTED`:
      return { ...state, message: action.payload };
    case `${PARK_CAR}_FULFILLED`:
      return { ...state, message: action.payload, update: true, fetch: true };
    case `${PARK_CAR}_PENDING`:
      return { ...state };
    case `${PARK_CAR}_REJECTED`:
      return { ...state, message: action.payload };
      
    default:
      return state;
  }
};
