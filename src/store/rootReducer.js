import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import blogsReducer from "./blogs/blogsReducer";

export const rootReducer = combineReducers({
    user:userReducer,
    blogs:blogsReducer
})