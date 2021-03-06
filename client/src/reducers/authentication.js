/* eslint-disable consistent-return */
import {
  USER_AUTHENTICATION,
  USER_AUTHENTICATION_TOKEN,
  USER_LOGOUT,
  USER_LOCATION_CHANGE,
} from '../constants/actionTypes';
import {
  ACCESS_TOKEN_STORAGE,
} from '../constants/environment';

const initialState = {
  accessToken: null,
  role: null,
  message: null,
  showError: null,
  position: null,
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
    case `${USER_AUTHENTICATION_TOKEN}_FULFILLED`:
      return {
        ...state,
        accessToken: action.meta.accessToken,
        role: action.payload.data.role,
      };

    case USER_LOGOUT:
      window.localStorage[ACCESS_TOKEN_STORAGE] = '';
      window.location.reload(false);
      return {
        ...state,
        accessToken: null
      };

    case USER_LOCATION_CHANGE:
      return { ...state, position: action.payload };
    default:
      return state;
  }
};
