import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";
import { persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(thunk))
);
