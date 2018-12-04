import axios from 'axios';

import { AUTH_URI, VALIDATE_TOKEN_URI, ACCESS_TOKEN_STORAGE } from '../constants/environment';
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
  // TODO: Fix Uncaught promise request
  return {
    type: USER_AUTHENTICATION_TOKEN,
    payload: axios.get(`${VALIDATE_TOKEN_URI}?token=${accessToken}`), // TODO: Use this one instead
    meta: { accessToken },
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
