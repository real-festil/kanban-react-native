import { createAction } from "redux-actions";
import API from "../utils/API";
import { deleteColumnRequest } from "./columns";

export const getCardsRequest = createAction("GET_CARDS_REQUEST");
export const getCardsSuccess = createAction("GET_CARDS_SUCCESS");
export const getCardsFailure = createAction("GET_CARDS_FAILURE");

export const addCardRequest = createAction("ADD_CARD_REQUEST");
export const addCardSuccess = createAction("ADD_CARD_SUCCESS");
export const addCardFailure = createAction("ADD_CARD_FAILURE");

export const deleteCardRequest = createAction("DELETE_CARD_REQUEST");
export const deleteCardSuccess = createAction("DELETE_CARD_SUCCESS");
export const deleteCardFailure = createAction("DELETE_CARD_FAILURE");

export const editCardRequest = createAction("EDIT_CARD_REQUEST");
export const editCardSuccess = createAction("EDIT_CARD_SUCCESS");
export const editCardFailure = createAction("EDIT_CARD_FAILURE");

export const getCards = ({ token }) => async dispatch => {
  dispatch(getCardsRequest());
  try {
    const res = await API.get("/cards", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(getCardsSuccess(res.data));
  } catch (e) {
    dispatch(getCardsFailure());
  }
};

export const addCard = ({
  token,
  title,
  description,
  column
}) => async dispatch => {
  dispatch(addCardRequest());
  try {
    const res = await API.post(
      `/columns/${column}/cards`,
      {
        title,
        description,
        checked: true,
        column
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    dispatch(addCardSuccess(res.data));
  } catch (e) {
    dispatch(addCardFailure());
  }
};

export const deleteCard = ({ token, id }) => async dispatch => {
  dispatch(deleteCardRequest());
  try {
    const res = await API.delete(`/cards/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(deleteCardSuccess({ id }));
  } catch (e) {
    dispatch(deleteCardFailure());
  }
};

export const editCard = ({ token, id, fields }) => async dispatch => {
  dispatch(editCardRequest());
  try {
    const res = await API.put(
      `/cards/${id}`,
      { ...fields },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    dispatch(editCardSuccess(res.data));
  } catch (e) {
    dispatch(editCardFailure());
  }
};
