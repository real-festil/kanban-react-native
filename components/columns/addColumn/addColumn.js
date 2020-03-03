import React, { Component } from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import { Button, Header, Input } from "react-native-elements";
import { addCol } from "../../../reducers/columnsList";
import { connect } from "react-redux";
import uuid from "react-native-uuid";

class AddColumn extends Component {
  state = {
    columnName: ""
  };

  onColAdd = () => {
    const { dispatch, modalHide } = this.props;

    dispatch(addCol({ name: this.state.columnName, id: uuid.v1() }));
    modalHide();
  };

  render() {
    const { visible, modalHide } = this.props;
    const { columnName } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        modalOpen={() => {
          this.setState((modalVisible: true));
        }}
      >
        <Header
          containerStyle={{
            backgroundColor: "#fff"
          }}
          centerComponent={{
            text: "Add column",
            style: { fontSize: 22 }
          }}
        />
        <Input
          autoFocus
          onChangeText={text => this.setState({ columnName: text })}
          placeholder="Column name"
          errorStyle={{ color: "red" }}
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
  Buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20
  }
});

export default connect()(AddColumn);
