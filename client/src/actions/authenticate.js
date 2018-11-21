import axios from "axios";

import { AUTH_URI } from '../constants/environment';
import { USER_AUTHENTICATION, OPEN_MODAL, CLOSE_MODAL, USER_LOGOUT } from '../constants/actionTypes';

   // TODO: Maybe open/close login modal and login request actions should be separate actions
export function openModal() {
  return {
    type: OPEN_MODAL,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}

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