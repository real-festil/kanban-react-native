import React, { Component } from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import Caption from "../../caption/caption";
import { connect } from "react-redux";
import { editColName, deleteCol } from "../../../reducers/columnsList";

class ColumnItem extends Component {
  onColDelete = () => {
    const { dispatch, navigation, route } = this.props;

    dispatch(deleteCol({ id: route.params.id }));
    navigation.navigate("Layout");
  };

  render() {
    const { id, name } = this.props.route.params;
    const { dispatch } = this.props;

    return (
      <View>
        <Header
          containerStyle={{
            backgroundColor: "#fff"
          }}
          centerComponent={
            <Caption
              value={name}
              editName={name => dispatch(editColName({ id, name }))}
            />
          }
          rightComponent={<Text onPress={this.onColDelete}>DELETE</Text>}
        />
        <Text>ColId: {JSON.stringify(name)}</Text>
      </View>
    );
  }
}

export default connect()(ColumnItem);
