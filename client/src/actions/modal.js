import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants/actionTypes';

   // TODO: Maybe open/close login modal and login request actions should be separate actions
export function openModal(content) {
  return {
    type: OPEN_MODAL,
    content,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}
