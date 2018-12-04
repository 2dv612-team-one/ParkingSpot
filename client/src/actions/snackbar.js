import {
  SHOW_MESSAGE,
  VERIFICATION_ERROR,
  CLOSE_SNACKBAR,
} from '../constants/actionTypes';

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
