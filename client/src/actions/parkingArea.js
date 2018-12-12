import axios from 'axios';

import {ADD_PARKING_AREA_URI} from '../constants/environment';
import {
  ADD_PARKING_AREA,
  GET_PARKING_AREAS,
  DELETE_PARKING_AREA,
} from '../constants/actionTypes';

export function addArea(accessToken, name, coords) {

    let config = {
        headers: {'Authorization': "Bearer " + accessToken}
    };

  return {
    type: ADD_PARKING_AREA,
    payload: axios.post(ADD_PARKING_AREA_URI, {name, coords }, config),
  };
}

export function getAreas() {
  return {
    type: GET_PARKING_AREAS,
    payload: axios.get(ADD_PARKING_AREA_URI),
  };
}

export function deleteArea(accessToken, name) {

  let config = {
    headers: {'Authorization': "Bearer " + accessToken}
  };

  return {
    type: DELETE_PARKING_AREA,
    payload: axios.delete(ADD_PARKING_AREA_URI + '/' + name, config),
  }
}
