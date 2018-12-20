import {
  USER_LOCATION_CHANGE,
  USER_NOT_CLOSE_TO_AREA,
} from '../constants/actionTypes';

export function setUserPosition(location) {
  return {
    type: USER_LOCATION_CHANGE,
    payload: location,
  };
}

export function notifyOutsideArea(areaID) {
  return {
    type: USER_NOT_CLOSE_TO_AREA,
    payload: areaID,
  };
}
