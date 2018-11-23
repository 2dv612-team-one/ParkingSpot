/* eslint import/no-webpack-loader-syntax: off */
import {
    ADD_CAR,
    GET_CARS,
} from '../constants/actionTypes';

const initialState = {
    message: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CARS + '_FULFILLED':
            return { ...state, data: action.payload.data }

        case ADD_CAR + '_PENDING':
            return { ...state }
        case ADD_CAR + '_REJECTED':
            return { ...state, message: action.payload }
        case ADD_CAR + '_FULFILLED':
            return { ...state, message: action.payload }
        default:
            return state;
    }
}
