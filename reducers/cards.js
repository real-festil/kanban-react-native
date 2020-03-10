import { handleActions } from "redux-actions";
import * as cardActions from "../actions/cards";
import { combineReducers } from "redux";

const cardsList = handleActions(
  {
    [cardActions.getCardsSuccess](state, action) {
      return action.payload;
    },
    [cardActions.addCardSuccess](state, action) {
      return [...state, action.payload];
    },
    [cardActions.deleteCardSuccess](state, action) {
      return state.filter(card => card.id !== action.payload.id);
    },
    [cardActions.editCardSuccess](state, action) {
      const { id, title, description } = action.payload;

      return state.map(card =>
        card.id === id ? { ...card, title, description } : card
      );
    }
  },
  []
);

const getCardsState = handleActions(
  {
    [cardActions.getCardRequest]() {
      return "requested";
    },
    [cardActions.getCardsSuccess]() {
      return "succeed";
    },
    [cardActions.getCardsFailure]() {
      return "failure";
    }
  },
  ""
);

const addCardsState = handleActions(
  {
    [cardActions.addCardRequest]() {
      return "requested";
    },
    [cardActions.addCardsSuccess]() {
      return "succeed";
    },
    [cardActions.addCardsFailure]() {
      return "failure";
    }
  },
  ""
);

const deleteCardsState = handleActions(
  {
    [cardActions.deleteCardRequest]() {
      return "requested";
    },
    [cardActions.deleteCardsSuccess]() {
      return "succeed";
    },
    [cardActions.deleteCardsFailure]() {
      return "failure";
    }
  },
  ""
);

const editCardsState = handleActions(
  {
    [cardActions.editCardRequest]() {
      return "requested";
    },
    [cardActions.editCardsSuccess]() {
      return "succeed";
    },
    [cardActions.editCardsFailure]() {
      return "failure";
    }
  },
  ""
);

export default combineReducers({
  cardsList,
  getCardsState,
  addCardsState,
  deleteCardsState,
  editCardsState
});
