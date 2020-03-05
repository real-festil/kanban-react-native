import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Header, Input, Button, ListItem, Badge } from "react-native-elements";
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
    navigation.goBack();
  };

  render() {
    const { id, name } = this.props.route.params;
    const { dispatch, cards, navigation } = this.props;

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
            {cards.map(card => {
              const { id, name, cardDesc, commentsLength } = card;

              return (
                <>
                  <ListItem
                    key={id}
                    title={
                      <>
                        <Text>name</Text>
                        <Badge value={commentsLength} status="primary" />
                      </>
                    }
                    onPress={() => {
                      navigation.navigate("Card", {
                        id,
                        name,
                        cardDesc
                      });
                    }}
                    containerStyle={{
                      borderWidth: 1,
                      marginBottom: 10,
                      borderRadius: 10
                    }}
                  />
                </>
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
  },
  list: {
    padding: 20
  }
});

const mapStateToProps = (state, props) => {
  return {
    cards: getColumnCards(state, props.route.params.id)
  };
};

export default connect(mapStateToProps)(ColumnItem);
