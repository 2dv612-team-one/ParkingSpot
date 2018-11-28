import axios from 'axios';

import { VEHICLE_URI } from '../constants/environment';
import {
  ADD_CAR,
  GET_CARS,
} from '../constants/actionTypes';

export function addCar(accessToken, registrationNumber) {
  return {
    type: ADD_CAR,
    payload: axios.post(VEHICLE_URI, { accessToken, registrationNumber }),
  };
}

export function getCars() {
  return {
    type: GET_CARS,
    payload: axios.get(VEHICLE_URI),
  };
}
