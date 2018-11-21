/* eslint import/no-webpack-loader-syntax: off */
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  USER_AUTHENTICATION,
  USER_REGISTRATION,
  USER_LOGOUT,
} from '../constants/actionTypes';
import {
  LOGIN_MODAL,
  REGISTER_MODAL
} from '../constants/environment';


const initialState = {
  [LOGIN_MODAL]: false,
  [REGISTER_MODAL]: false,
  accessToken: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case OPEN_MODAL:
      return { ...state, [action.content]: true }
    case CLOSE_MODAL:
      return { ...state, [LOGIN_MODAL]: false, [REGISTER_MODAL]: false }
    case USER_LOGOUT:
      return { ...state, accessToken: null }

    // TODO: Maybe open login modal and login request actions should be separate reducers
    case USER_AUTHENTICATION + '_PENDING':
      return { ...state }
    case USER_AUTHENTICATION + '_REJECTED':
      return { ...state }
    case USER_AUTHENTICATION + '_FULFILLED':
      return {...state, accessToken: action.payload.data.accessToken, [LOGIN_MODAL]: false}

    case USER_REGISTRATION + '_PENDING':
      return { ...state }
    case USER_REGISTRATION + '_REJECTED':
      return { ...state, message: 'Något gick fel under registreringen' }
    case USER_REGISTRATION + '_FULFILLED':
      return {...state, message: 'Registrerad! Kolla din mail', [REGISTER_MODAL]: false}
    default:
      return state;
  }
}
