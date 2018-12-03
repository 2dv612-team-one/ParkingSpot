import axios from 'axios';

import { REGISTER_URI } from '../constants/environment';
import {
  USER_REGISTRATION,
} from '../constants/actionTypes';

export default function register(username, email, password, roles) {
  return {
    type: USER_REGISTRATION,
    payload: axios.post(REGISTER_URI, { username, email, password, roles:[roles]}),
  };
}
