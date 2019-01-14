import axios from 'axios';

import { VEHICLE_URI, VEHICLE_USER_URI } from '../constants/environment';
import {
  ADD_CAR,
  GET_CARS,
  GET_USER_CARS,
  DELETE_CAR
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

export function getUserCars(accessToken) {
  let config = {
    headers: {'Authorization': "Bearer " + accessToken}
  };

  return {
    type: GET_USER_CARS,
    payload: axios.get(VEHICLE_USER_URI, config),
  };
}

export function deleteCar(accessToken, registrationNumber) {

  let config = {
    headers: {'Authorization': "Bearer " + accessToken}
  };

  return {
    type: DELETE_CAR,
    payload: axios.delete(VEHICLE_URI + '/' + registrationNumber, config),
  }
}
