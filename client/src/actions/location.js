import {
  USER_LOCATION_CHANGE,
} from '../constants/actionTypes';

export default function setUserPosition(location) {
  return {
    type: USER_LOCATION_CHANGE,
    payload: location,
  };
}
