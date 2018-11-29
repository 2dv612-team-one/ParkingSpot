/* eslint import/no-webpack-loader-syntax: off */
import {
  USER_AUTHENTICATION,
  USER_AUTHENTICATION_TOKEN,
  USER_REGISTRATION,
  CLOSE_SNACKBAR,
  ADD_CAR,
  GET_CARS,
  GET_ROLES,
  VERIFICATION_ERROR,
} from '../constants/actionTypes';

const initialState = {
  message: null,
  showError: null,
};

const isServerError = p => p.response.status >= 500;
const getError = (state, message) => ({ ...state, message, showError: true });

export default (state = initialState, action) => {
  switch (action.type) {
    case `${USER_AUTHENTICATION}_REJECTED`:
      if (isServerError(action.payload)) {
        return getError(state, 'Fel uppstod vid inloggning. Försök igen');
      }
      return initialState;
    case `${USER_REGISTRATION}_REJECTED`:
      if (isServerError(action.payload)) {
        return getError(state, 'Fel uppstod vid registrering. Försök igen');
      }
      return initialState;
    case `${USER_AUTHENTICATION_TOKEN}_REJECTED`:
      return initialState;

    case `${ADD_CAR}_REJECTED`:
      if (isServerError(action.payload)) {
        return getError(state, 'Fel uppstod vid registrering av fordon. Försök igen');
      }
      return initialState;
    case `${GET_CARS}_REJECTED`:
      if (isServerError(action.payload)) {
        return getError(state, 'Fel uppstod vid hämtning av fordon. Försök igen');
      }
      return initialState;
    case `${GET_ROLES}_REJECTED`:
      if (isServerError(action.payload)) {
        return getError(state, 'Fel uppstod vid hämtning av fordon. Försök igen');
      }
      return initialState;
    case VERIFICATION_ERROR:
      return getError(state, 'Din verifieringstoken kan inte hittas, eller har gått ut. Försök igen');
    case CLOSE_SNACKBAR:
      return { ...state, message: null, showError: false };
    default:
      return state;
  }
};
