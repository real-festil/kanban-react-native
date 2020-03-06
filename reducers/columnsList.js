import { handleActions, createAction } from "redux-actions";
import * as columnActions from "../actions/columnsList";

const initialState = [];

export default handleActions(
  {
    [columnActions.getColumnsSuccess](state, action) {
      return action.payload.columns;
    },
    [columnActions.addColumnSuccess](state, action) {
      return [...state, action.payload];
    }
    // [editColName](state, action) {
    //   const { id, name } = action.payload;
    //   return state.map(column =>
    //     column.id === id ? { ...column, name } : column
    //   );
    // },
    // [addCol](state, action) {
    //   const { id, name } = action.payload;
    //   return [
    //     ...state,
    //     {
    //       id,
    //       name
    //     }
    //   ];
    // },
    // [deleteCol](state, action) {
    //   return state.filter(column => column.id !== action.payload.id);
    // }
  },
  initialState
);
