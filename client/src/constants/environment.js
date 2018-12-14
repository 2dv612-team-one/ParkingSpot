// API Endpoints
export const API_ROOT = '/api';
export const AUTH_URI = `${API_ROOT}/auth/login`;
export const REGISTER_URI = `${API_ROOT}/auth/register`;
export const VEHICLE_URI = `${API_ROOT}/vehicles`;
export const VALIDATE_TOKEN_URI = `${API_ROOT}/auth/validate`;
export const GET_ROLES_URI = `${API_ROOT}/roles`;
export const REGISTER_USER_URI = `${API_ROOT}/admin/user/register`;
export const DELETE_USER_URI = `${API_ROOT}/users/delete`;
export const SEND_MESSAGE_URL =`${API_ROOT}/message/send`;
export const CONFIRM_MESSAGE_URL =`${API_ROOT}/message/confirm`;
export const UPDATE_USER_PASSWORD_URL = `${API_ROOT}/users/update`;

// Parking spot uris
export const PARKING_AREA_URI = `${API_ROOT}/parkingspots`;
export const PARKING_AREA_RATES_URI = `${PARKING_AREA_URI}/rates`;

// Modals
export const LOGIN_MODAL = 'showLoginModal';
export const REGISTER_MODAL = 'showRegisterModal';
export const ERRORHANDLING_MODAL = 'showErrorHandlingModal';
export const PARKING_AREA_MODAL = 'showParkingAreaModal';

// Local Storage
export const ACCESS_TOKEN_STORAGE = 'ACCESS_TOKEN_STORAGE';

