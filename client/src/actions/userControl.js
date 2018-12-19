import axios from 'axios';

import { GET_ROLES_URI, GET_UNSEEN_MESSAGES_URI, REGISTER_USER_URI, DELETE_USER_URI, SEND_MESSAGE_URL } from '../constants/environment';
import {
  GET_ROLES,
  GET_UNSEEN_MESSAGES,
  REGISTER_USER,
  SEND_MESSAGE,
  USER_DELETE,
  VERIFICATION_ERROR,
} from '../constants/actionTypes';


export function getRoles() {
  return {
    type: GET_ROLES,
    payload: axios.get(GET_ROLES_URI),
  };
}

export function getUnseenMessages(accessToken) {
  let config = {
    headers: { 'Authorization': "Bearer " + accessToken }
  };
  return {
    type: GET_UNSEEN_MESSAGES,
    payload: axios.get(GET_UNSEEN_MESSAGES_URI, config)
  }
};

export function sendMessage(accessToken, msg) {
  let config = {
    headers: { 'Authorization': "Bearer " + accessToken }
  };
  return {
    type: SEND_MESSAGE,
    payload: axios.post(SEND_MESSAGE_URL, { msg }, config)
  }
};

export function register(accessToken, username, password, email, roles) {

  let config = {
    headers: { 'Authorization': "Bearer " + accessToken }
  };

  return {
    type: REGISTER_USER,
    payload: axios.post(REGISTER_USER_URI, { username, password, email, roles }, config),
  };
}

export function deleteUser(accessToken) {

  let config = {
    headers: { 'Authorization': "Bearer " + accessToken }
  };

  return {
    type: USER_DELETE,
    payload: axios.delete(DELETE_USER_URI, config),
  };
}

export function emailVerificationError() {
  return {
    type: VERIFICATION_ERROR,
  };
}