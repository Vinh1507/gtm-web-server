import { combineReducers } from "redux";
import contestReducer from "./contestReducer";
const core = combineReducers({
  contestReducer,
});
export default core;
