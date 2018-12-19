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
        position: getUserPosition()
      };
    case `${USER_AUTHENTICATION_TOKEN}_FULFILLED`:
      return {
        ...state,
        accessToken: action.meta.accessToken,
        role: action.payload.data.role,
        poisition: getUserPosition()
      };

    case USER_LOGOUT:
      window.localStorage[ACCESS_TOKEN_STORAGE] = '';
      window.location.reload(false);
      return {
        ...state,
        accessToken: null
      };
    default:
      return state;
  }
};

function getUserPosition(){

  let options= {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: Infinity
  }

  navigator.geolocation.watchPosition((success) => {
    
    // Returning position as wkt.
    return "POINT (" + success.coords.longitude + " " + success.coords.latitude + ")";
  }, error => {
      return null;
  }, options);
}
