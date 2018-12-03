import axios from 'axios';

import { VEHICLE_URI } from '../constants/environment';
import {
  ADD_CAR,
  GET_CARS,
} from '../constants/actionTypes';

export function addCar(accessToken, registrationNumber) {
  let config = {
    headers: {'Authorization': "Bearer " + accessToken}
  }

  return {
    type: ADD_CAR,
    payload: axios.post(VEHICLE_URI, { accessToken, registrationNumber }, config),
  };
}

export function getCars() {
  return {
    type: GET_CARS,
    payload: axios.get(VEHICLE_URI),
  };
}
