import axios from 'axios';

import { PARKING_URI } from '../constants/environment';
import {
  PARK_CAR,
  UNPARK_CAR,
  GET_PARKINGS
} from '../constants/actionTypes';

export function getParkings() {
  return {
    type: GET_PARKINGS,
    payload: axios.get(PARKING_URI),
  };
}

export function parkCar(accessToken, registrationNumber, areaID) {
  let config = {
    headers: {'Authorization': "Bearer " + accessToken}
  }

  return {
    type: PARK_CAR,
    payload: axios.post(PARKING_URI, { registrationNumber, areaID }, config),
  };
}

export function unparkCar(accessToken, areaID) {
  let config = {
    headers: {'Authorization': "Bearer " + accessToken}
  };

  return {
    type: UNPARK_CAR,
    payload: axios.delete(PARKING_URI +  '/' + areaID, config)
  }
}