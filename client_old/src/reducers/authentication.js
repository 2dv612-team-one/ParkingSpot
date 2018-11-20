/* eslint import/no-webpack-loader-syntax: off */
const initialState = {
  accessToken: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case "LOGIN_USER_PENDING":
      return {...state, fetching: true}
    case "LOGIN_USER_REJECTED":
      return {...state, fetching: false, fetched: false, error: action.payload}
    case "LOGIN_USER_SUCCESS":
      return {...state, fetching: false, fetched: true, employees: action.payload}
    default:
      return state;
  }
}
