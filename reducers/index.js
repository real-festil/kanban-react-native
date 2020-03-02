import cards from "./cards";
import columnsList from "./columnsList";
import comments from "./comments";
import login from "./login";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cards,
  columnsList,
  comments,
  login
});

export default rootReducer;
