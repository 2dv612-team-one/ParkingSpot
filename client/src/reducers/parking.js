import {
  GET_PARKINGS
} from '../constants/actionTypes';

const initialState = {
  data: [],
  message: null,
  update: false,
  fetch: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_PARKINGS}_FULFILLED`:
      return { ...state, data: action.payload.data, update: false };

    default:
      return state;
  }
};
