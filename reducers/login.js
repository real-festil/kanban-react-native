import { handleActions, createAction } from "redux-actions";
import * as loginActions from "../actions/login";

const initialState = { email: "", token: "" };

export default handleActions(
  {
    [loginActions.loginSuccess](state, action) {
      const { email, token, name } = action.payload;

      return { ...state, email, name, token };
    },
    [loginActions.registerSuccess](state, action) {
      const { email, token } = action.payload;

      return { ...state, email, token };
    }
  },
  initialState
);
