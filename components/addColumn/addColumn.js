import React, { Component } from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import { Button, Header, Input } from "react-native-elements";

class AddColumn extends Component {
  state = {
    columnName: ""
  };

  onColAdd = () => {
    const { dispatch, modalHide, onColAdd } = this.props;
    const { columnName } = this.state;

    if (columnName.trim()) {
      onColAdd(columnName);
      modalHide();
    }
  };

  render() {
    const { visible, modalHide } = this.props;
    const { columnName } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        presentationStyle="pageSheet"
        visible={visible}
      >
        <Header
          containerStyle={styles.Header}
          centerComponent={{
            text: "Add column",
            style: { fontSize: 22 }
          }}
        />
        <Input
          autoFocus
          onChangeText={text => this.setState({ columnName: text })}
          placeholder="Column name"
          value={columnName}
          errorMessage={columnName ? "" : "Enter column name"}
        />
        <View style={styles.Buttons}>
          <Button title="Add column" onPress={this.onColAdd} />
          <Button title="Cancel" type="outline" onPress={() => modalHide()} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  Header: {
    backgroundColor: "#fff"
  },
  Buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20
  }
});

export default AddColumn;
