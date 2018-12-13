/* eslint import/no-webpack-loader-syntax: off */
import {
  SHOW_MESSAGE,
  SEND_MESSAGE,
  CLOSE_SNACKBAR,
  MARK_MESSAGE_VIEWED,
} from '../constants/actionTypes';

const initialState = {
  message: { id: null, message: '' },
  showInfo: null,
  messages: [],
};

const addMessage = (state, action) => ({ ...state, messages: [...state.messages, { ...action.payload, },], });
const addSocketMessage = (state, message, id) => ({ ...state, messages: [...state.messages, { message, id, },], });

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      let isSocketMessage = action.payload.id === undefined;
      if (isSocketMessage) {
        let message = action.payload.body;
        let id = action.id;
        return addSocketMessage(state, message, id);
      } else {
        return addMessage(state, action);
      }
    case `${SEND_MESSAGE}_FULFILLED`:
      return { ...state, message: action.payload.body, showInfo: true };
    case `${SEND_MESSAGE}_REJECTED`:
      return { ...state };
    case `${SEND_MESSAGE}_PENDING`:
      return { ...state };
    case `${MARK_MESSAGE_VIEWED}_FULFILLED`:
      return {
        ...state,
        messages: state.messages.filter(
          message => message.id !== action.id,
        ),
      };

    case CLOSE_SNACKBAR:
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