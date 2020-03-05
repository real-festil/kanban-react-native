import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableHighlight
} from "react-native";
import { Header, Input, Button, ListItem } from "react-native-elements";

class Description extends Component {
  state = {
    isOpened: false,
    cardDesc: this.props.cardDesc
  };

  onDescChange = () => {
    const { cardDesc, isOpened } = this.state;

    this.setState({ isOpened: false });
    this.props.descChange(cardDesc.trim() ? cardDesc : this.props.cardDesc);
  };

  render() {
    const { cardDesc, isOpened } = this.state;

    return (
      <View style={styles.Description}>
        {isOpened ? (
          <>
            <TextInput
              multiline
              defaultValue={cardDesc}
              style={styles.TextInput}
              onChangeText={text =>
                this.setState({
                  cardDesc: text ? text : this.props.cardDesc
                })
              }
            ></TextInput>
            <View style={styles.Buttons}>
              <Button title="Change desc" onPress={this.onDescChange} />
              <Button
                title="Cancel"
                onPress={() =>
                  this.setState({
                    isOpened: false,
                    cardDesc: this.props.cardDesc
                  })
                }
              />
            </View>
          </>
        ) : (
          <TouchableHighlight onPress={() => this.setState({ isOpened: true })}>
            <View>
              <Text style={styles.DescriptionHeader}>Description: </Text>
              <Text style={styles.DescriptionText}>{cardDesc}</Text>
            </View>
          </TouchableHighlight>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Description: {
    padding: 20
  },
  DescriptionHeader: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10
  },
  DescriptionText: {
    fontSize: 16
  },
  TextInput: {
    borderWidth: 1,
    padding: 5,
    maxHeight: 100,
    alignItems: "flex-start"
  },
  Buttons: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default Description;
