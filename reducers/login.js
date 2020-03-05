import { handleActions, createAction } from "redux-actions";

const initialState = [];

export const login = createAction("LOGIN");
export const register = createAction("REGISTER");

export default handleActions(
  {
    [login](state, action) {
      return action.payload.text;
    },
    [register](state, action) {
      const { name, email, password } = action.payload;
    }
  },
  initialState
);
