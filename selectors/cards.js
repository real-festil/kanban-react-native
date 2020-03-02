import { createSelector } from "reselect";
import { getComments } from "./comments";

const getCards = state => state.cards;

export const getColumnCards = createSelector(
  getCards,
  getComments,
  (_, colId) => colId,
  (cards, comments, colId) => {
    const columnCards = cards.filter(card => card.colId === colId);
    return columnCards.map(card => {
      const cardComments = comments.filter(
        comment => comment.cardId === card.id
      );
      const commentsLength = cardComments.length;

      return { ...card, commentsLength };
    });
  }
);
