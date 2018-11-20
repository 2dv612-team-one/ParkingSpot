import axios from "axios";

import { AUTH_URI } from '../constants/environment';
import { USER_AUTHENTICATION } from '../constants/actionTypes';

export function login() {
  return {
    type: USER_AUTHENTICATION,
    payload: axios.get(AUTH_URI),
  }
}

