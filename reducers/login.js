import { handleActions, createAction } from "redux-actions";

const initialState = "";

export const login = createAction("LOGIN");

export default handleActions(
  {
    [login](state, action) {
      return action.payload.text;
    }
  },
  initialState
);
