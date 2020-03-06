import { handleActions, createAction } from "redux-actions";
import * as loginActions from "../actions/login";

const initialState = { username: "", token: "" };

export default handleActions(
  {
    [loginActions.loginSuccess](state, action) {
      const { email, token } = action.payload;

      return { ...state, username: email, token };
    },
    [loginActions.registerSuccess](state, action) {
      const { email, token } = action.payload;

      return { ...state, username: email, token };
    }
  },
  initialState
);
