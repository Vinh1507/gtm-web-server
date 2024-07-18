import { combineReducers } from "redux";
import domainList from "./domainList";
import domainDetail from "./domainDetail";

const domainReducer = combineReducers({ domainList, domainDetail });
export default domainReducer;
