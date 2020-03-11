import { createAction } from "redux-actions";
import API from "../utils/API";
import * as RootNavigation from "../utils/RootNavigation";

export const loginRequest = createAction("LOGIN_REQUEST");
export const loginSuccess = createAction("LOGIN_SUCCESS");
export const loginFailure = createAction("LOGIN_FAILURE");

export const registerRequest = createAction("REGISTER_REQUEST");
export const registerSuccess = createAction("REGISTER_SUCCESS");
export const registerFailure = createAction("REGISTER_FAILURE");

export const register = ({ email, name, password }) => async dispatch => {
  dispatch(registerRequest());
  try {
    const res = await API.post("/auth/sign-up", {
      email,
      name,
      password
    });
    dispatch(registerSuccess({ email }));
  } catch (e) {
    dispatch(registerFailure());
  }
};

export const login = ({ email, password }) => async dispatch => {
  dispatch(loginRequest());
  try {
    const res = await API.post("/auth/sign-in", {
      email,
      password
    });
    if (res.data.token) {
      const { token, email, name } = res.data;

      dispatch(loginSuccess({ email, name, token }));
      RootNavigation.navigate("Layout");
    } else {
      dispatch(loginFailure());
    }
  } catch (e) {
    dispatch(loginFailure());
  }
};
