import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, Header, Input } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import API from "../../utils/API";

const Login = props => {
  const navigation = useNavigation();

  useEffect(() => {
    API.get("/columns").then(res => console.log(res));
  }, []);

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
      <View>
        <Input
          placeholder="email"
          textContentType="emailAddress"
          label="email"
        />
        <Input
          placeholder="password"
          textContentType="password"
          secureTextEntry
          label="password"
        />
        <Button title="Login" onPress={() => navigation.navigate("Layout")} />
      </View>
      <KeyboardAvoidingView>
        <Text>OR REGISTER</Text>
        <Input placeholder="name" textContentType="name" label="name" />
        <Input
          placeholder="email"
          textContentType="emailAddress"
          label="email"
        />
        <Input
          placeholder="password"
          textContentType="password"
          secureTextEntry
          label="password"
        />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Layout")}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
