import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Input } from "react-native-elements";

class Caption extends Component {
  state = {
    isInput: false,
    name: this.props.value
  };

  onInputBlur = () => {
    const { name } = this.state;
    const { editName, value } = this.props;

    this.setState({ isInput: false });
    editName(name.trim() ? name : value);
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
            style={{ fontSize: 24, color: this.props.color }}
            onPress={() => this.setState({ isInput: true })}
          >
            {name}
          </Text>
        )}
      </>
    );
  }
}

export default Caption;
