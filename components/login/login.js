import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, Header, Input } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { register, login } from "../../actions/login";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    email: "",
    password: "",
    newEmail: "",
    newName: "",
    newPassword: ""
  };

  onLogin = () => {
    const { email, password } = this.state;

    this.props.dispatch(login({ email, password }));
  };

  render() {
    const { dispatch } = this.props;
    const { email, password, newEmail, newName, newPassword } = this.state;

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
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
          <Input
            placeholder="password"
            textContentType="password"
            secureTextEntry
            label="password"
            value={password}
            onChangeText={text => this.setState({ password: text })}
          />
          <Button title="Login" onPress={this.onLogin} />
        </View>
        <KeyboardAvoidingView>
          <Text>OR REGISTER</Text>
          <Input
            placeholder="name"
            textContentType="name"
            label="name"
            value={newName}
            onChangeText={text => this.setState({ newName: text })}
          />
          <Input
            placeholder="email"
            textContentType="emailAddress"
            label="email"
            value={newEmail}
            onChangeText={text => this.setState({ newEmail: text })}
          />
          <Input
            placeholder="password"
            textContentType="password"
            secureTextEntry
            label="password"
            value={newPassword}
            onChangeText={text => this.setState({ newPassword: text })}
          />
          <Button
            title="Register"
            onPress={() =>
              dispatch(
                register({
                  email: newEmail,
                  name: newName,
                  password: newPassword
                })
              )
            }
          />
        </KeyboardAvoidingView>
      </>
    );
  }
}

export default connect()(Login);
