import axios from "axios";

import { AUTH_URI, REGISTER_URI } from '../constants/environment';
import { 
  USER_AUTHENTICATION,
  USER_REGISTRATION,
  OPEN_MODAL,
  CLOSE_MODAL,
  USER_LOGOUT,
} from '../constants/actionTypes';

   // TODO: Maybe open/close login modal and login request actions should be separate actions
export function openModal(content) {
  return {
    type: OPEN_MODAL,
    content,
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

export function register(username, email, password) {
  return {
    type: USER_REGISTRATION,
    payload: axios.post(REGISTER_URI, { username, email, password }),
  }
}
