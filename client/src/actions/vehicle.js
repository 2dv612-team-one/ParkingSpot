import axios from 'axios';

import { VEHICLE_URI, PARKING_URI } from '../constants/environment';
import {
  ADD_CAR,
  GET_CARS,
  DELETE_CAR,
  PARK_CAR,
  UNPARK_CAR
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

export function deleteCar(accessToken, registrationNumber) {

  let config = {
    headers: {'Authorization': "Bearer " + accessToken}
  };

  return {
    type: DELETE_CAR,
    payload: axios.delete(VEHICLE_URI + '/' + registrationNumber, config),
  }
}

export function parkCar(accessToken, registrationNumber, areaID) {
  let config = {
    headers: {'Authorization': "Bearer " + accessToken}
  };

  console.log('returning ' + PARK_CAR )

  return {
    type: PARK_CAR,
    payload: axios.post(PARKING_URI, { registrationNumber, areaID }, config)
  }
}

export function unparkCar(accessToken, areaID) {
  let config = {
    headers: {'Authorization': "Bearer " + accessToken}
  };

  console.log('returning ' + UNPARK_CAR)

  return {
    type: UNPARK_CAR,
    payload: axios.delete(PARKING_URI +  '/' + areaID, config)
  }
}