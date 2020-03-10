import { handleActions } from "redux-actions";
import * as columnActions from "../actions/columns";
import { combineReducers } from "redux";

const columnsList = handleActions(
  {
    [columnActions.getColumnsSuccess](state, action) {
      return action.payload.columns;
    },
    [columnActions.addColumnSuccess](state, action) {
      return [...state, action.payload];
    },
    [columnActions.deleteColumnSuccess](state, action) {
      return state.filter(column => column.id !== action.payload.id);
    },
    [columnActions.updateColumnSuccess](state, action) {
      const { id, title } = action.payload;
      return state.map(column =>
        column.id === id ? { ...column, title } : column
      );
    }
  },
  []
);

const getColumnsState = handleActions(
  {
    [columnActions.getColumnsRequest]() {
      return "requested";
    },
    [columnActions.getColumnsSuccess]() {
      return "succeed";
    },
    [columnActions.getColumnsFailure]() {
      return "failed";
    }
  },
  ""
);

const addColumnsState = handleActions(
  {
    [columnActions.addColumnsRequest]() {
      return "requested";
    },
    [columnActions.addColumnsSuccess]() {
      return "succeed";
    },
    [columnActions.addColumnsFailure]() {
      return "failed";
    }
  },
  ""
);

const deleteColumnsState = handleActions(
  {
    [columnActions.deleteColumnsRequest]() {
      return "requested";
    },
    [columnActions.deleteColumnsSuccess]() {
      return "succeed";
    },
    [columnActions.deleteColumnsFailure]() {
      return "failed";
    }
  },
  ""
);

const updateColumnsState = handleActions(
  {
    [columnActions.updateColumnsRequest]() {
      return "requested";
    },
    [columnActions.updateColumnsSuccess]() {
      return "succeed";
    },
    [columnActions.updateColumnsFailure]() {
      return "failed";
    }
  },
  ""
);

export default combineReducers({
  columnsList,
  getColumnsState,
  addColumnsState,
  deleteColumnsState,
  updateColumnsState
});
