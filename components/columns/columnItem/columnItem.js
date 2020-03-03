import React, { Component } from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import { Header } from "react-native-elements";

class ColumnItem extends Component {
  render() {
    const { params } = this.props.route;

    return (
      <View>
        <Header
          containerStyle={{
            backgroundColor: "#fff"
          }}
          centerComponent={{
            text: params.name,
            style: { fontSize: 22 }
          }}
        />
        <Text>ColId: {JSON.stringify(params.name)}</Text>
      </View>
    );
  }
}

export default ColumnItem;
