/* eslint import/no-webpack-loader-syntax: off */
// TODO: There are duplicate reducers, is that really necessary?
import { combineReducers } from 'redux';

import authentication from './reducers/authentication';

export default combineReducers({
  authentication,
});
