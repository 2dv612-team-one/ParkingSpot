import axios from 'axios';

import { GET_ROLES_URI, REGISTER_USER_URI } from '../constants/environment';
import {
  GET_ROLES,
  REGISTER_USER
} from '../constants/actionTypes';


export function getRoles() {
  return {
    type: GET_ROLES,
    payload: axios.get(GET_ROLES_URI),
  };
}

export function register(accessToken, username, password, email, roles) {

    let config = {
        headers: {'Authorization': "Bearer " + accessToken}
    }

    return {
      type: REGISTER_USER,
      payload: axios.post(REGISTER_USER_URI, {username, password, email, roles}, config),
    };
  }
