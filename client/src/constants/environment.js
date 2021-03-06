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
export const UPDATE_USER_EMAIL_URL = `${API_ROOT}/users/update/email`;
export const VALIDATE_TOKEN_URI = `${API_ROOT}/auth/validate`;
export const VEHICLE_URI = `${API_ROOT}/vehicles`;
export const VEHICLE_USER_URI = `${API_ROOT}/vehicles/user`;
export const PARKING_URI = `${API_ROOT}/parkings`;

// Parking spot uris
export const PARKING_AREA_URI = `${API_ROOT}/parkingarea`;
export const PARKING_AREA_RATES_URI = `${PARKING_AREA_URI}/rates`;

// Modals
export const LOGIN_MODAL = 'showLoginModal';
export const PARKING_AREA_MODAL = 'showParkingAreaModal';
export const VEHICLE_MODAL = 'showVehicleModal';
export const REGISTER_MODAL = 'showRegisterModal';

// Local Storage
export const ACCESS_TOKEN_STORAGE = 'ACCESS_TOKEN_STORAGE';
