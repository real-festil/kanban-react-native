import { createAction } from "redux-actions";
import API from "../utils/API";
import {
  deleteColumnRequest,
  getColumnsRequest,
  addColumnSuccess,
  addColumnRequest
} from "./columns";

export const getCommentsRequest = createAction("GET_COMMENTS_REQUEST");
export const getCommentsSuccess = createAction("GET_COMMENTS_SUCCESS");
export const getCommentsFailure = createAction("GET_COMMENTS_FAILURE");

export const addCommentRequest = createAction("ADD_COMMENT_REQUEST");
export const addCommentSuccess = createAction("ADD_COMMENT_SUCCESS");
export const addCommentFailure = createAction("ADD_COMMENT_FAILURE");

export const deleteCommentRequest = createAction("DELETE_COMMENT_REQUEST");
export const deleteCommentSuccess = createAction("DELETE_COMMENT_SUCCESS");
export const deleteCommentFailure = createAction("DELETE_COMMENT_FAILURE");

export const editCommentRequest = createAction("EDIT_COMMENT_REQUEST");
export const editCommentSuccess = createAction("EDIT_COMMENT_SUCCESS");
export const editCommentFailure = createAction("EDIT_COMMENT_FAILURE");

export const getComments = ({ token }) => async dispatch => {
  dispatch(getCommentsRequest());
  try {
    const res = await API.get("/comments", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(res);
    dispatch(getCommentsSuccess());
  } catch (e) {
    dispatch(getCommentsFailure());
  }
};

export const addComment = ({ token, body }) => async dispatch => {
  dispatch(addCommentRequest());
  try {
    const res = await API.post(
      "/comments",
      {
        body
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(res);
    dispatch(addCommentSuccess());
  } catch (e) {
    dispatch(addCommentFailure());
  }
};
