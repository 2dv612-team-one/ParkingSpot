/* eslint-disable consistent-return */
/* eslint import/no-webpack-loader-syntax: off */
import {
  USER_AUTHENTICATION,
  USER_AUTHENTICATION_TOKEN,
  USER_LOGOUT,
} from '../constants/actionTypes';
import {
  ACCESS_TOKEN_STORAGE,
} from '../constants/environment';

const initialState = {
  accessToken: null,
  role: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${USER_AUTHENTICATION}_FULFILLED`:
      window.localStorage[ACCESS_TOKEN_STORAGE] = action.payload.data.accessToken;
      return {
        ...state,
        accessToken: action.payload.data.accessToken,
        role: action.payload.data.role,
      };

    case `${USER_AUTHENTICATION_TOKEN}_REJECTED`:
      return {
        ...state,
        accessToken: null,
      };
    case `${USER_AUTHENTICATION_TOKEN}_FULFILLED`:
      return {
        ...state,
        accessToken: action.meta.accessToken,
        role: action.payload.data.role,
      };

    case USER_LOGOUT:
      window.localStorage[ACCESS_TOKEN_STORAGE] = '';
      window.location.reload(false);
      break;
    default:
      return state;
  }
};
