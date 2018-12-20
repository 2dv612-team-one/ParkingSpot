/* eslint-disable no-case-declarations */
/* eslint import/no-webpack-loader-syntax: off */
import {
  ADD_CAR,
  DELETE_CAR,
  DELETE_PARKING_AREA,
  GET_CARS,
  GET_ROLES,
  REGISTER_USER,
  REMOVE_SNACKBAR,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PASSWORD,
  USER_AUTHENTICATION_TOKEN,
  USER_AUTHENTICATION,
  USER_REGISTRATION,
  VERIFICATION_ERROR,
} from '../constants/actionTypes';

const initialState = {
  messages: [],
};

const isServerError = p => p.response.status >= 500;
const isInvalidCredentials = p => p.response.status >= 400;
const parkingNotAreaEmpty = p => p.response.status === 418;

const addMessage = (state, message, id) => ({ ...state, messages: [...state.messages, { message, id }] });

export default (state = initialState, action) => {
  switch (action.type) {
    case `${ADD_CAR}_REJECTED`:
      if (isServerError(action.payload)) {
        const errorMessage = 'Fel uppstod vid registrering av fordon. Försök igen.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      if (isInvalidCredentials(action.payload)) {
        const errorMessage = 'Fordonet har redan registrerats.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case `${DELETE_CAR}_REJECTED`:
      if (isServerError(action.payload)) {
        const errorMessage = 'Fel uppstod vid radering av fordon. Försök igen.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      if (parkingNotAreaEmpty(action.payload)) {
        const errorMessage = 'Fel vid radering av fordon, då den är registrerad på en parkeringsplats.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case `${DELETE_PARKING_AREA}_REJECTED`:
      if (isServerError(action.payload)) {
        const errorMessage = 'Fel uppstod vid radering av parkeringsplats. Försök igen.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      if (parkingNotAreaEmpty(action.payload)) {
        const errorMessage = 'Fel vid radering av parkeringsplats, då det finns fordon registrerat där.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case `${GET_CARS}_REJECTED`:
      if (isServerError(action.payload)) {
        const errorMessage = 'Fel uppstod vid hämtning av fordon. Försök igen.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case `${GET_ROLES}_REJECTED`:
      if (isServerError(action.payload)) {
        const errorMessage = 'Fel uppstod vid hämtning av roller. Försök igen.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case `${REGISTER_USER}_REJECTED`:
      if (isServerError(action.payload)) {
        const errorMessage = 'Fel uppstod vid registrering. Försök igen.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      if (isInvalidCredentials(action.payload)) {
        const errorMessage = action.payload.response.data.message;
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case `${UPDATE_USER_EMAIL}_REJECTED`:
      if (isServerError(action.payload)) {
        const errorMessage = 'Fel uppstod vid ändring av e-postadress. Försök igen.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      if (isInvalidCredentials(action.payload)) {
        const errorMessage = 'Fel uppstod vid ändring av e-postadress. Försök igen.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case `${UPDATE_USER_PASSWORD}_REJECTED`:
      if (isServerError(action.payload)) {
        const errorMessage = 'Fel uppstod vid ändring av lösenord. Försök igen.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      if (isInvalidCredentials(action.payload)) {
        const errorMessage = 'Fel uppstod vid ändring av lösenord. Försök igen.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
    case `${USER_AUTHENTICATION_TOKEN}_REJECTED`:
      return initialState;
    case VERIFICATION_ERROR:
      let errorMessage = 'Din verifieringstoken kan inte hittas, eller har gått ut. Försök igen.';
      let id = new Date().getTime() + Math.random();
      return addMessage(state, errorMessage, id);
    case `${USER_AUTHENTICATION}_REJECTED`:
      if (isServerError(action.payload)) {
        const errorMessage = 'Fel uppstod vid inloggning. Försök igen.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      if (isInvalidCredentials(action.payload)) {
        let errorMessage = action.payload.response.data.message;
        const id = new Date().getTime() + Math.random();

        if (errorMessage === "Bad credentials") {
          errorMessage = 'Fel användarnamn eller lösenord.';
          return addMessage(state, errorMessage, id);
        }
      }
      return initialState;
    case `${USER_REGISTRATION}_REJECTED`:
      if (isServerError(action.payload)) {
        const errorMessage = 'Fel uppstod vid registrering. Försök igen.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      if (isInvalidCredentials(action.payload)) {
        const errorMessage = 'Användarnamnet eller mailadressen finns redan.';
        const id = new Date().getTime() + Math.random();
        return addMessage(state, errorMessage, id);
      }
      return initialState;
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
