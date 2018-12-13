/* eslint import/no-webpack-loader-syntax: off */
import {
  USER_AUTHENTICATION,
  USER_REGISTRATION,
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants/actionTypes';
import {
  LOGIN_MODAL,
  REGISTER_MODAL,
  PARKING_AREA_MODAL
} from '../constants/environment';


const initialState = {
  [LOGIN_MODAL]: { show: false, props: {}, update: false },
  [REGISTER_MODAL]: { show: false, props: {}, update: false },
  [PARKING_AREA_MODAL]: { show: false, props: {}, update: false }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, [action.content]: {show: true, props: action.props, update: true } };
    case CLOSE_MODAL:
      return initialState;

    case `${USER_AUTHENTICATION}_FULFILLED`:
      return { ...state, [LOGIN_MODAL]: { show: false, props: {} } };
    case `${USER_REGISTRATION}_FULFILLED`:
      return { ...state, [REGISTER_MODAL]: {show: false, props: {}} };
    default:
      return state;
  }
};
