/* eslint import/no-webpack-loader-syntax: off */
import {
  USER_AUTHENTICATION,
  USER_AUTHENTICATION_TOKEN,
  USER_REGISTRATION,
  REGISTER_USER,
  REMOVE_SNACKBAR,
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
const addMessage = (state, message, id) => ({ ...state, messages: [...state.messages, { message, id, },], });

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
        let id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
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
    case REMOVE_SNACKBAR:
      return {
        ...state,
        messages: state.messages.filter(
          message => message.id !== action.id,
        ),
      };
    default:
      return state;
  }
};