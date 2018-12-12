import axios from 'axios';

import { UPDATE_USER_PASSWORD_URL } from '../constants/environment';
import {
  UPDATE_USER_PASSWORD
} from '../constants/actionTypes';


export function changePassword(accessToken, password) {
  let config = {
    headers: {'Authorization': "Bearer " + accessToken}
  };

  return {
    type: UPDATE_USER_PASSWORD,
    payload: axios.put(UPDATE_USER_PASSWORD_URL, {password}, config),
  };
}
