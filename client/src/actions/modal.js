import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants/actionTypes';

// TODO: Maybe open/close login modal and login request actions should be separate actions
export function openModal(content, props) {
  props = props || {}
  
  return {
    type: OPEN_MODAL,
    content,
    props
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}
