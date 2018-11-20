// TODO: There are duplicate reducers, is that really necessary?
import { combineReducers } from "redux";

import authentication from "./authentication"

export default combineReducers({ authentication });
