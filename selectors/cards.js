import { createSelector } from "reselect";
import { getComments } from "./comments";

const getCards = state => state.cards.cardsList;

export const getColumnCards = createSelector(
  getCards,
  getComments,
  (_, columnId) => columnId,
  (cards, comments, columnId) => {
    const columnCards = cards.filter(card => card.columnId === columnId);
    return columnCards.map(card => {
      const cardComments = comments.filter(
        comment => comment.cardId === card.id
      );
      const commentsLength = cardComments.length;

      return { ...card, commentsLength };
    });
  }
);

export const getCard = createSelector(
  getCards,
  (_, id) => id,
  (cards, id) => cards.filter(card => card.id === id)
);
