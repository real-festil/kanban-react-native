import { handleActions, createAction } from "redux-actions";

const initialState = [];

export const addCard = createAction("ADD_CARD");
export const deleteCard = createAction("DELETE_CARD");
export const editCard = createAction("EDIT_CARD_DESC");

export default handleActions(
  {
    [addCard](state, action) {
      const { id, colId, name } = action.payload;

      return [
        ...state,
        {
          id,
          colId,
          name,
          comments: 0,
          cardDesc: ""
        }
      ];
    },
    [deleteCard](state, action) {
      return state.filter(card => card.id !== action.payload.id);
    },
    [editCard](state, action) {
      const { cardId, fields } = action.payload;

      return state.map(card =>
        card.id === cardId ? { ...card, ...fields } : card
      );
    }
  },
  initialState
);