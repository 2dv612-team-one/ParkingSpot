import axios from 'axios';

import { AUTH_URI, ACCESS_TOKEN_STORAGE } from '../constants/environment';
import {
  USER_AUTHENTICATION,
  USER_AUTHENTICATION_TOKEN,
  USER_LOGOUT,
} from '../constants/actionTypes';

export function login(usernameOrEmail, password) {
  return {
    type: USER_AUTHENTICATION,
    payload: axios.post(AUTH_URI, { usernameOrEmail, password }),
  };
}

export function logout() {
  return {
    type: USER_LOGOUT,
  };
}

function accessTokenLoaded(accessToken) {
  // TODO: Check against the server if the token is valid
  return {
    type: USER_AUTHENTICATION_TOKEN,
    payload: { data: { accessToken } },
    // payload: axios.get(AUTH_URI, { accessToken }), // TODO: Use this one instead
  };
}

export function fetchAccessTokenFromLocalStorage() {
  return (dispatch) => {
    const storedKey = window.localStorage[ACCESS_TOKEN_STORAGE];

    if (storedKey !== '') {
      dispatch(accessTokenLoaded(storedKey));
    }
  };
}
