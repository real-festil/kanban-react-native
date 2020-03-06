import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store/configureStore";
import Layout from "./containers/layout/layout";
import Login from "./components/login/login";
import ColumnItem from "./components/columns/columnItem/columnItem";
import Card from "./components/card/card";
import { navigationRef } from "./utils/RootNavigation";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator headerMode="none" initialRouteName="Home">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Layout" component={Layout} />
            <Stack.Screen name="Column" component={ColumnItem} />
            <Stack.Screen name="Card" component={Card} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
