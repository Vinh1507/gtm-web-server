import { combineReducers } from "redux";
import domainReducer from "./domainReducer";
const core = combineReducers({
  domainReducer,
});
export default core;
