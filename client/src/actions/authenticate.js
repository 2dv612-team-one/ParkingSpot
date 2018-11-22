import axios from "axios";

import { AUTH_URI } from '../constants/environment';
import { 
  USER_AUTHENTICATION,
  USER_LOGOUT,
} from '../constants/actionTypes';

export function login(usernameOrEmail, password) {
  return {
    type: USER_AUTHENTICATION,
    payload: axios.post(AUTH_URI, { usernameOrEmail, password }),
  }
}

export function logout() {
  return {
    type: USER_LOGOUT,
  }
}

