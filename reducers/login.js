import { handleActions, createAction } from "redux-actions";
import * as loginActions from "../actions/login";
import { combineReducers } from "redux";

const login = handleActions(
  {
    [loginActions.loginSuccess](state, action) {
      const { email, token, name } = action.payload;

      return { ...state, email, name, token };
    }
    // [loginActions.registerSuccess](state, action) {
    //   return state;
    // }
  },
  { email: "", name: "", token: "" }
);

const loginState = handleActions(
  {
    [loginActions.loginRequest]() {
      return "requested";
    },
    [loginActions.loginSuccess]() {
      return "succeed";
    },
    [loginActions.loginFailure]() {
      return "failed";
    }
  },
  ""
);

const registerState = handleActions(
  {
    [loginActions.registerRequest]() {
      return "requested";
    },
    [loginActions.registerSuccess]() {
      return "succeed";
    },
    [loginActions.registerFailure]() {
      return "failed";
    }
  },
  ""
);

export default combineReducers({
  login,
  loginState,
  registerState
});
