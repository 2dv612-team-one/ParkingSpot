import axios from 'axios';

import {
  SHOW_MESSAGE,
  VERIFICATION_ERROR,
  CLOSE_SNACKBAR,
  MARK_MESSAGE_VIEWED,
} from '../constants/actionTypes';
import { CONFIRM_MESSAGE_URL } from '../constants/environment';

export function closeSnackBar() {
  return {
    type: CLOSE_SNACKBAR,
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

export function markMessageViewed(id, accessToken) {
  let config = {
    headers: {'Authorization': "Bearer " + accessToken}
  };

  return {
    type: MARK_MESSAGE_VIEWED,
    payload: axios.post(CONFIRM_MESSAGE_URL, {id }, config),
  };
}
