import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Header, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { register, login } from "../../actions/login";
import { connect } from "react-redux";
import Spinner from "../../components/spinner/spinner";
import ValidationComponent from "react-native-form-validator";

class Login extends ValidationComponent {
  state = {
    email: "",
    password: "",
    newEmail: "",
    newName: "",
    newPassword: ""
  };

  onLogin = () => {
    const { email, password } = this.state;

    if (email.trim() && password.trim()) {
      if (this.validate({ email: { email } })) {
        this.props.dispatch(login({ email, password }));
      }
    }
  };

  onRegister = () => {
    const { newEmail, newName, newPassword } = this.state;

    if (newEmail.trim() && newPassword.trim()) {
      if (this.validate({ newEmail: { email: newEmail } })) {
        this.props.dispatch(
          register({ email: newEmail, name: newName, password: newPassword })
        );
      }
    }
  };

  render() {
    const { dispatch, loginState, registerState } = this.props;
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
        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={200}>
          <View style={styles.Container}>
            <Input
              placeholder="email"
              textContentType="emailAddress"
              label="email"
              value={email}
              errorMessage={email.trim() ? "" : "Enter email"}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              placeholder="password"
              textContentType="password"
              secureTextEntry
              label="password"
              value={password}
              errorMessage={password.trim() ? "" : "Enter password"}
              onChangeText={text => this.setState({ password: text })}
            />
            {loginState === "requested" ? (
              <Spinner />
            ) : (
              <Button
                title="Login"
                containerStyle={styles.LoginButton}
                onPress={this.onLogin}
              />
            )}
            {loginState === "failed" && (
              <Text style={styles.ErrorText}>Invalid login or password</Text>
            )}
          </View>
          <View style={styles.Container}>
            <Text style={styles.RegisterText}>-OR REGISTER-</Text>
            <Input
              placeholder="name"
              textContentType="name"
              label="name"
              value={newName}
              errorMessage={newName.trim() ? "" : "Enter name"}
              onChangeText={text => this.setState({ newName: text })}
            />
            <Input
              placeholder="email"
              textContentType="emailAddress"
              label="email"
              value={newEmail}
              errorMessage={newEmail.trim() ? "" : "Enter email"}
              onChangeText={text => this.setState({ newEmail: text })}
            />
            <Input
              placeholder="password"
              textContentType="password"
              secureTextEntry
              label="password"
              value={newPassword}
              errorMessage={newPassword.trim() ? "" : "Enter password"}
              onChangeText={text => this.setState({ newPassword: text })}
            />
            {registerState === "requested" ? (
              <Spinner />
            ) : (
              <Button
                containerStyle={styles.LoginButton}
                title="Register"
                onPress={this.onRegister}
              />
            )}
            {registerState === "succeed" && (
              <Text style={styles.SuccessText}>
                Register Succeed! Now you can login
              </Text>
            )}
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    padding: 20
  },
  LoginButton: {
    width: 100,
    alignSelf: "center",
    margin: 10
  },
  RegisterText: {
    textAlign: "center",
    fontSize: 20,
    borderWidth: 1,
    borderBottomWidth: 1,
    marginTop: -20,
    marginBottom: 20
  },
  ErrorText: {
    textAlign: "center",
    color: "red"
  },
  SuccessText: {
    textAlign: "center",
    color: "green"
  }
});

const mapStateToProps = state => {
  const { loginState, registerState } = state.login;

  return {
    loginState: loginState,
    registerState: registerState
  };
};

export default connect(mapStateToProps)(Login);
