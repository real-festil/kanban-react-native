import { createAction } from "redux-actions";
import API from "../utils/API";

export const getCardsRequest = createAction("GET_CARDS_REQUEST");
export const getCardsSuccess = createAction("GET_CARDS_SUCCESS");
export const getCardsFailure = createAction("GET_CARDS_FAILURE");

export const addCardRequest = createAction("ADD_CARD_REQUEST");
export const addCardSuccess = createAction("ADD_CARD_SUCCESS");
export const addCardFailure = createAction("ADD_CARD_FAILURE");

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

export const addCard = ({token, title, description, column}) => async dispatch {
  dispatch(addCardRequest());
  try {
    const res = await API.post(`/columns/${column}/cards`,
      {
        title,
        description,
        checked: true,
        column
      },
      {
      headers: {
        Authorization: `Bearer ${token}`
      }}

    )
    console.log(res.data)
    dispatch(addCardSuccess());
  } catch (e) {
    dispatch(addCardFailure());
  }
}
