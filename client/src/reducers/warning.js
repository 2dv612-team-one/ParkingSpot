/* eslint import/no-webpack-loader-syntax: off */
import {
  REMOVE_SNACKBAR,
  USER_AUTHENTICATION,
  USER_NOT_CLOSE_TO_AREA,
} from '../constants/actionTypes';

const initialState = {
  messages: [],
};

const isInvalidCredentials = p => p.response.status >= 400;

const addMessage = (state, message, messageID, areaID) => ({ ...state, messages: [...state.messages, { message, messageID, areaID }] });

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_NOT_CLOSE_TO_AREA:
      const areaID = action.payload;
      const messageID = new Date().getTime() + Math.random();
      const warningMessage = 'Du befinner dig utanför parkeringsområdet. Avsluta parkering?';
      return addMessage(state, warningMessage, messageID, areaID);
    case `${USER_AUTHENTICATION}_REJECTED`:
      if (isInvalidCredentials(action.payload)) {
        let errorMessage = action.payload.response.data.message;
        const id = new Date().getTime() + Math.random();

        if (errorMessage !== "Bad credentials") {
          return addMessage(state, errorMessage, id);
        }
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