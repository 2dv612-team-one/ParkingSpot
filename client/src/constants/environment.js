// API Endpoints
export const API_ROOT = '/api';
export const AUTH_URI = `${API_ROOT}/auth/login`;
export const CONFIRM_MESSAGE_URL = `${API_ROOT}/message/confirm`;
export const DELETE_USER_URI = `${API_ROOT}/users/delete`;
export const GET_ROLES_URI = `${API_ROOT}/roles`;
export const GET_UNSEEN_MESSAGES_URI = `${API_ROOT}/message/unseen`;
export const REGISTER_URI = `${API_ROOT}/auth/register`;
export const REGISTER_USER_URI = `${API_ROOT}/admin/user/register`;
export const SEND_MESSAGE_URL = `${API_ROOT}/message/send`;
export const UPDATE_USER_PASSWORD_URL = `${API_ROOT}/users/update`;
export const VALIDATE_TOKEN_URI = `${API_ROOT}/auth/validate`;
export const VEHICLE_URI = `${API_ROOT}/vehicles`;

// Parking spot uris
export const PARKING_AREA_RATES_URI = `${PARKING_AREA_URI}/rates`;
export const PARKING_AREA_URI = `${API_ROOT}/parkingarea`;

// Modals
export const ERRORHANDLING_MODAL = 'showErrorHandlingModal';
export const LOGIN_MODAL = 'showLoginModal';
export const PARKING_AREA_MODAL = 'showParkingAreaModal';
export const REGISTER_MODAL = 'showRegisterModal';

// Local Storage
export const ACCESS_TOKEN_STORAGE = 'ACCESS_TOKEN_STORAGE';