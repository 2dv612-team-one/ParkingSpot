/* eslint import/no-webpack-loader-syntax: off */
import {
  USER_AUTHENTICATION,
  USER_LOGOUT,
} from '../constants/actionTypes';

const initialState = {
  accessToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${USER_AUTHENTICATION}_PENDING`:
      return { ...state };
    case `${USER_AUTHENTICATION}_REJECTED`:
      return { ...state };
    case `${USER_AUTHENTICATION}_FULFILLED`:
      return {
        ...state,
        accessToken: action.payload.data.accessToken,
      };

    case USER_LOGOUT:
      return { ...state, accessToken: null };
    default:
      return state;
  }
};
