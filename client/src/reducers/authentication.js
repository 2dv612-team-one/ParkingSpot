/* eslint import/no-webpack-loader-syntax: off */
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  USER_AUTHENTICATION,
} from '../constants/actionTypes';

const initialState = {
  showLoginModal: false,
  accessToken: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case OPEN_MODAL:
      return { ...state, showLoginModal: true }
    case CLOSE_MODAL:
      return { ...state, showLoginModal: false }
    // TODO: Maybe open login modal and login request actions should be separate reducers
    case USER_AUTHENTICATION + '_PENDING':
      return { ...state }
    case USER_AUTHENTICATION + '_REJECTED':
      return { ...state }
    case USER_AUTHENTICATION + '_FULFILLED':
      return {...state, accessToken: action.payload.data.accessToken, showLoginModal: false}
    default:
      return state;
  }
}
