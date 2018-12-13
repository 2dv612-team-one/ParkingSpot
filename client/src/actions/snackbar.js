import axios from 'axios';

import {
  CLOSE_SNACKBAR,
  ENQUEUE_SNACKBAR,
  MARK_MESSAGE_VIEWED,
  SHOW_MESSAGE,
  VERIFICATION_ERROR,
} from '../constants/actionTypes';
import { CONFIRM_MESSAGE_URL } from '../constants/environment';

export function closeSnackBar() {
  return {
    type: CLOSE_SNACKBAR,
  };
}

export function enqueueSnackbar(notification) {
  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      key: new Date().getTime() + Math.random(),
      ...notification,
    },
  };
}

export function markMessageViewed(id, accessToken) {
  let config = {
    headers: { 'Authorization': "Bearer " + accessToken }
  };

  return {
    type: MARK_MESSAGE_VIEWED,
    payload: axios.post(CONFIRM_MESSAGE_URL, { id }, config),
  };
}

export function showMessage(message) {
  return {
    type: SHOW_MESSAGE,
    payload: message,
  };
}

export function emailVerificationError() {
  return {
    type: VERIFICATION_ERROR,
  };
}