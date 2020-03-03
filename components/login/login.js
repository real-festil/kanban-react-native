import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Header } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const Login = props => {
  const navigation = useNavigation();

  return (
    <>
      <Header
        containerStyle={{
          backgroundColor: "#fff"
        }}
        centerComponent={{
          text: "Login",
          style: { fontSize: 22 }
        }}
      />
      <Button title="Login" onPress={() => navigation.navigate("Layout")} />
    </>
  );
};

export default Login;
