import { createStore } from "redux";
import reducer from "../reducers";
import { persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
