import { combineReducers } from "redux";
import Global from "./global";
import Entity from "./entity";
import Filter from "./filter";
import Additional from "./additional";
import Dogs from "./dogs";

const rootReducer = combineReducers({ Global,Entity,Filter,Dogs,Additional });
export default rootReducer;