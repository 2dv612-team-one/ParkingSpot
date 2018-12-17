import axios from 'axios';

import {
  REMOVE_SNACKBAR,
  MARK_MESSAGE_VIEWED,
  SHOW_MESSAGE,
  VERIFICATION_ERROR,
} from '../constants/actionTypes';
import { CONFIRM_MESSAGE_URL } from '../constants/environment';

export function removeSnackbar(id) {
  return {
    type: REMOVE_SNACKBAR,
    id: id
  };
}

export function markMessageViewed(id, accessToken) {
  let config = {
    headers: { 'Authorization': "Bearer " + accessToken }
  };
  return {
    type: MARK_MESSAGE_VIEWED,
    payload: axios.post(CONFIRM_MESSAGE_URL, { id }, config)
  }
};

export function showMessage(message) {
  let msg = '';
  try {
    msg = JSON.parse(message.body);
    return {
      type: SHOW_MESSAGE,
      payload: {
        ...msg,
      },
    };
  } catch {
  }
}

export function emailVerificationError() {
  return {
    type: VERIFICATION_ERROR,
  };
}