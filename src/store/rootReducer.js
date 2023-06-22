import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import blogsReducer from "./blogs/blogsReducer";
import actionReducer from "./actions/actionsReducer";

export const rootReducer = combineReducers({
    user:userReducer,
    blogs:blogsReducer,
    actions:actionReducer
})