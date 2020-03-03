import React, { Component } from "react";
import { View, Modal, Text, StyleSheet, ScrollView } from "react-native";
import { Header, Input, Button, ListItem } from "react-native-elements";
import Caption from "../../caption/caption";
import { connect } from "react-redux";
import { editColName, deleteCol } from "../../../reducers/columnsList";
import { addCard } from "../../../reducers/cards";
import uuid from "react-native-uuid";
import { getColumnCards } from "../../../selectors/cards";

class ColumnItem extends Component {
  state = {
    cardName: ""
  };

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
        <View style={styles.AddPrayer}>
          <Button
            title="+"
            onPress={() =>
              dispatch(
                addCard({ id: uuid.v1(), colId: id, name: this.state.cardName })
              )
            }
          />
          <Input
            containerStyle={{
              flex: 1
            }}
            onChangeText={text => this.setState({ cardName: text })}
            value={this.state.cardName}
            placeholder="add a prayer"
          />
        </View>
        <View style={styles.list}>
          <ScrollView>
            {this.props.cards.map(column => {
              return (
                <ListItem
                  key={column.id}
                  title={column.name}
                  onPress={() => {
                    this.props.navigation.navigate("Column", {
                      id: column.id,
                      name: column.name
                    });
                  }}
                  containerStyle={{
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 10
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AddPrayer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderColor: "gray",
    borderRadius: 10
  }
});

const mapStateToProps = (state, props) => {
  return {
    cards: getColumnCards(state, props.route.params.id)
  };
};

export default connect(mapStateToProps)(ColumnItem);
