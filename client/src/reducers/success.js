/* eslint import/no-webpack-loader-syntax: off */
import {
  ADD_CAR,
  REGISTER_USER,
  REMOVE_SNACKBAR,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_EMAIL,
  USER_REGISTRATION,
} from '../constants/actionTypes';

const initialState = {
  messages: [],
};

const isSuccess = p => p.status >= 200 && p.status < 300;

const addMessage = (state, message, id) => ({ ...state, messages: [...state.messages, { message, id, },], });

export default (state = initialState, action) => {
  switch (action.type) {
    case `${REGISTER_USER}_FULFILLED`:
      if (isSuccess(action.payload)) {
        let successMessage = 'Kontot skapades.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, successMessage, id);
      }
      return initialState;
    case `${USER_REGISTRATION}_FULFILLED`:
      if (isSuccess(action.payload)) {
        let successMessage = 'Kontot skapades. Du måste nu bekräfta din e-postadress.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, successMessage, id);
      }
      return initialState;
    case `${ADD_CAR}_FULFILLED`:
      if (isSuccess(action.payload)) {
        let successMessage = 'Fordonet har registrerats.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, successMessage, id);
      }
      return initialState;
    case `${UPDATE_USER_PASSWORD}_FULFILLED`:
      if (isSuccess(action.payload)) {
        let successMessage = 'Lösenordet har ändrats.';
        let id = new Date().getTime() + Math.random();
        return addMessage(state, successMessage, id);
      }
      return initialState;
    case `${UPDATE_USER_EMAIL}_FULFILLED`:
    if (isSuccess(action.payload)) {
      let successMessage = 'E-postadressen har ändrats.';
      let id = new Date().getTime() + Math.random();
      return addMessage(state, successMessage, id);
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