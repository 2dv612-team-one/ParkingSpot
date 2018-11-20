/* eslint import/no-webpack-loader-syntax: off */
import { combineReducers } from 'redux';

import authentication from './reducers/authentication';

export default combineReducers({
  authentication,
});
