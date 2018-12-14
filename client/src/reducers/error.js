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

const addMessage = (state, message, id) => ({ ...state, messages: [...state.messages, { message, id, },], });

export default (state = initialState, action) => {
  switch (action.type) {
    case `${USER_AUTHENTICATION}_REJECTED`:
      if (isServerError(action.payload)) {
        let errorMessage = 'Fel uppstod vid inloggning. Försök igen.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      if (isInvalidCredentials(action.payload)) {
        let errorMessage = 'Fel användarnamn eller lösenord.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case `${USER_REGISTRATION}_REJECTED`:
      if (isServerError(action.payload)) {
        let errorMessage = 'Fel uppstod vid registrering. Försök igen.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      if (isInvalidCredentials(action.payload)) {
        let errorMessage = 'Användarnamnet eller mailadressen finns redan.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case `${REGISTER_USER}_REJECTED`:
      if (isServerError(action.payload)) {
        let errorMessage = 'Fel uppstod vid registrering. Försök igen.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
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
        let errorMessage = 'Fel uppstod vid registrering av fordon. Försök igen.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      if (isInvalidCredentials(action.payload)) {
        let errorMessage = 'Fordonet har redan registrerats.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case `${GET_CARS}_REJECTED`:
      if (isServerError(action.payload)) {
        let errorMessage = 'Fel uppstod vid hämtning av fordon. Försök igen.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case `${GET_ROLES}_REJECTED`:
      if (isServerError(action.payload)) {
        let errorMessage = 'Fel uppstod vid hämtning av roller. Försök igen.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case VERIFICATION_ERROR:
      let errorMessage = 'Din verifieringstoken kan inte hittas, eller har gått ut. Försök igen.';
      let id = new Date().getTime() + Math.random();
      return addMessage(state, errorMessage, id);
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