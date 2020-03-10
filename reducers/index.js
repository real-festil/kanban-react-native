import cards from "./cards";
import columns from "./columns";
import comments from "./comments";
import login from "./login";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cards,
  columns,
  comments,
  login
});

export default rootReducer;
