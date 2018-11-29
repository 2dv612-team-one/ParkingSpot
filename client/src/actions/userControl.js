import axios from 'axios';

import { GET_ROLES_URI } from '../constants/environment';
import {
  GET_ROLES,
} from '../constants/actionTypes';


export function getRoles() {
  return {
    type: GET_ROLES,
    payload: axios.get(GET_ROLES_URI),
  };
}
