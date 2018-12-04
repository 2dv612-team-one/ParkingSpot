import axios from 'axios';

import { ADD_PARKING_AREA_URI } from '../constants/environment';
import {
  ADD_PARKING_AREA,
} from '../constants/actionTypes';

export function addArea(accessToken, name, coords) {

    let config = {
        headers: {'Authorization': "Bearer " + accessToken}
    }

  return {
    type: ADD_PARKING_AREA,
    payload: axios.post(ADD_PARKING_AREA_URI, { accessToken, name, coords }, config),
  };
}
