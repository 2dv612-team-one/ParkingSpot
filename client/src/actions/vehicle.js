import axios from "axios";

import { VEHICLE_URI } from '../constants/environment';
import {
  ADD_CAR,
} from '../constants/actionTypes';

export function addCar(accessToken, registrationNumber) {
    console.log(registrationNumber);
  return {
    type: ADD_CAR,
    payload: axios.post(VEHICLE_URI, { accessToken, registrationNumber }),
  }
}
