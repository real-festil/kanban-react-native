import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Input } from "react-native-elements";

class Caption extends Component {
  state = {
    isInput: false,
    name: this.props.value
  };

  onInputBlur = () => {
    this.setState({ isInput: false });
    this.props.editName(this.state.name);
  };

  render() {
    const { isInput, name } = this.state;

    return (
      <>
        {isInput ? (
          <Input
            autoFocus
            value={name}
            onChangeText={text => this.setState({ name: text })}
            onBlur={this.onInputBlur}
          />
        ) : (
          <Text
            style={styles.text}
            onPress={() => this.setState({ isInput: true })}
          >
            {name}
          </Text>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24
  }
});

export default Caption;
