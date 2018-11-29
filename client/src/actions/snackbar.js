import {
  VERIFICATION_ERROR,
  CLOSE_SNACKBAR,
} from '../constants/actionTypes';

export function closeSnackBar() {
  return {
    type: CLOSE_SNACKBAR,
  };
}

export function emailVerificationError() {
  return {
    type: VERIFICATION_ERROR,
  };
}
