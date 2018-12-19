import axios from 'axios';

import { PARKING_AREA_URI, PARKING_AREA_RATES_URI } from '../constants/environment';
import {
  ADD_PARKING_AREA,
  GET_PARKING_AREAS,
  DELETE_PARKING_AREA,
  EDIT_PARKING_AREA,
  ADD_PARKING_AREA_RATES,
} from '../constants/actionTypes';

export function addArea(accessToken, props) {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  return {
    type: ADD_PARKING_AREA,
    payload: axios.post(PARKING_AREA_URI, props, config),
  };
}

export function getAreas() {
  return {
    type: GET_PARKING_AREAS,
    payload: axios.get(PARKING_AREA_URI),
  };
}

export function deleteArea(accessToken, id) {
  const config = {
    headers: { Authorization: `Bearer ${  accessToken}` },
  };

  return {
    type: DELETE_PARKING_AREA,
    payload: axios.delete(`${PARKING_AREA_URI}/${id}`, config),
  };
}

export function editArea(accessToken, id, newProps) {
  const config = {
    headers: { Authorization: `Bearer ${  accessToken}` },
  };

  return {
    type: EDIT_PARKING_AREA,
    payload: axios.put(`${PARKING_AREA_URI }/${id}`, newProps, config),
  };
}

export function saveRates(accessToken, id, rates) {
  const config = {
    headers: { Authorization: `Bearer ${  accessToken}` },
  };

  return {
    type: ADD_PARKING_AREA_RATES,
    payload: axios.put(`${PARKING_AREA_RATES_URI}/${id}`, rates, config),
  };
}
