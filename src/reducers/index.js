import {combineReducers} from "redux";
import {counterReducer} from "./counterReducer";
import {usersReducer} from "./usersReducer";

export default combineReducers({
    counterReducer,
    usersReducer,
});