/* eslint import/no-webpack-loader-syntax: off */
import {
  REGISTER_USER,
  USER_REGISTRATION,
  REMOVE_SNACKBAR,
} from '../constants/actionTypes';

const initialState = {
  message: null,
  showSuccess: null,
  messages: [],
};

const isSuccess = p => p.status >= 200 && p.status < 300;

// const getInfo = (state, message) => ({ ...state, message, showSuccess: true });
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

    case REMOVE_SNACKBAR:
      return { ...state, message: null, showSuccess: false };
    default:
      return state;
  }
};