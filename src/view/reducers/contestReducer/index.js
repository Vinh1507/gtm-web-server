import { combineReducers } from "redux";
import contestList from "./contestList";
import contestDetail from "./contestDetail";

const contestReducer = combineReducers({ contestList, contestDetail });
export default contestReducer;
