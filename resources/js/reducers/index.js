import { combineReducers } from "redux";
import listProject from "./listProject";
import inputChange from "./inputChange";
import listTasks from "./listTasks";
export const rootReducer = combineReducers({
    listProject,
    inputChange,
    listTasks
});
