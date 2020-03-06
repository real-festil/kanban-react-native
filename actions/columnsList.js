import { createAction } from "redux-actions";
import API from "../utils/API";
import * as RootNavigation from "../utils/RootNavigation";

export const getColumnsRequest = createAction("GET_COLUMNS_REQUEST");
export const getColumnsSuccess = createAction("GET_COLUMNS_SUCCESS");
export const getColumnsFailure = createAction("GET_COLUMNS_FAILURE");

export const deleteColumnRequest = createAction("DELETE_COLUMN_REQUEST");
export const deleteColumnSuccess = createAction("DELETE_COLUMN_SUCCESS");
export const deleteColumnFailure = createAction("DELETE_COLUMN_FAILURE");

export const updateColumnRequest = createAction("UPDATE_COLUMN_REQUEST");
export const updateColumnSuccess = createAction("UPDATE_COLUMN_SUCCESS");
export const updateColumnFailure = createAction("UPDATE_COLUMN_FAILURE");

export const addColumnRequest = createAction("ADD_COLUMN_REQUEST");
export const addColumnSuccess = createAction("ADD_COLUMN_SUCCESS");
export const addColumnFailure = createAction("ADD_COLUMN_FAILURE");

export const getColumns = ({ token }) => async dispatch => {
  dispatch(getColumnsRequest());
  try {
    const res = await API.get("/columns", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(getColumnsSuccess({ columns: res.data }));
  } catch (e) {
    dispatch(getColumnsFailure());
  }
};

export const addColumn = ({ token, title }) => async dispatch => {
  dispatch(addColumnRequest());
  try {
    const res = await API.post(
      "/columns",
      {
        title,
        description: "description"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    dispatch(addColumnSuccess(res.data));
  } catch (e) {
    dispatch(addColumnFailure());
  }
};
