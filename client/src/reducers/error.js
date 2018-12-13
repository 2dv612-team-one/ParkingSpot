/* eslint import/no-webpack-loader-syntax: off */
import {
  USER_AUTHENTICATION,
  USER_AUTHENTICATION_TOKEN,
  USER_REGISTRATION,
  REGISTER_USER,
  CLOSE_SNACKBAR,
  ADD_CAR,
  GET_CARS,
  GET_ROLES,
  VERIFICATION_ERROR,
} from '../constants/actionTypes';

const initialState = {
  message: null,
  showError: null,
  messages: [],
};

const isServerError = p => p.response.status >= 500;
const isInvalidCredentials = p => p.response.status >= 400;

const getError = (state, message) => ({ ...state, message, showError: true });
const addMessage = (state, message) => ({ ...state, messages: [...state.messages, { message, },], });

export default (state = initialState, action) => {
  switch (action.type) {
    case `${USER_AUTHENTICATION}_REJECTED`:
      if (isServerError(action.payload)) {
        return getError(state, 'Fel uppstod vid inloggning. Försök igen');
      }
      if (isInvalidCredentials(action.payload)) {
        return getError(state, 'Fel användarnamn eller lösenord.');
      }
      return initialState;
    case `${USER_REGISTRATION}_REJECTED`:
      if (isServerError(action.payload)) {
        return getError(state, 'Fel uppstod vid registrering. Försök igen');
      }
      if (isInvalidCredentials(action.payload)) {
        return getError(state, 'Användarnamnet eller mailadressen finns redan');
      }
      return initialState;
    case `${REGISTER_USER}_REJECTED`:
      if (isServerError(action.payload)) {
        return getError(state, 'Fel uppstod vid registrering. Försök igen');
      }
      if (isInvalidCredentials(action.payload)) {
        let errorMessage = action.payload.response.data.message;
        return addMessage(state, errorMessage);
        // return getError(state, errorMessage);
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