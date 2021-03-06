import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Header, Input, Button, ListItem, Badge } from "react-native-elements";
import Caption from "../../components/caption/caption";
import { connect } from "react-redux";
import { deleteColumn, updateColumn } from "../../actions/columns";
import { addCard, getCards, deleteCard } from "../../actions/cards";
import uuid from "react-native-uuid";
import { getColumnCards } from "../../selectors/cards";
import { SwipeListView } from "react-native-swipe-list-view";
import Spinner from "../../components/spinner/spinner";

class ColumnItem extends Component {
  state = {
    cardName: ""
  };

  componentDidMount() {
    const { dispatch, token } = this.props;

    dispatch(getCards({ token }));
  }

  onColDelete = () => {
    const { dispatch, navigation, route, token } = this.props;

    dispatch(deleteColumn({ token, id: route.params.id }));
    navigation.goBack();
  };

  onCardAdd = () => {
    const { dispatch, route, token } = this.props;

    if (this.state.cardName.trim()) {
      dispatch(
        addCard({
          token,
          title: this.state.cardName,
          description: "Введите описание",
          column: route.params.id
        })
      );
      this.setState({ cardName: "" });
    }
  };

  render() {
    const { id, name } = this.props.route.params;
    const { dispatch, cards, navigation, token, getCardsState } = this.props;

    return (
      <View style={styles.Body}>
        <Header
          containerStyle={{
            backgroundColor: "#fff"
          }}
          centerComponent={
            <Caption
              value={name}
              editName={name =>
                dispatch(updateColumn({ token, id, title: name }))
              }
            />
          }
          rightComponent={<Text onPress={this.onColDelete}>DELETE</Text>}
        />
        <View style={styles.AddPrayer}>
          <Button
            title="+"
            buttonStyle={styles.Button}
            titleStyle={styles.ButtonTitle}
            onPress={this.onCardAdd}
          />
          <Input
            containerStyle={{
              flex: 1
            }}
            inputContainerStyle={{
              borderBottomWidth: 0
            }}
            onChangeText={text => this.setState({ cardName: text })}
            value={this.state.cardName}
            placeholder="Add a prayer"
          />
        </View>
        <View style={styles.List}>
          {getCardsState === "requested" ? (
            <Spinner />
          ) : getCardsState === "failed" ? (
            <Text>Something Went Wrong</Text>
          ) : (
            <ScrollView>
              <SwipeListView
                keyExtractor={() => uuid.v1()}
                data={cards}
                renderItem={(data, rowMap) => {
                  const { id, title, description, commentsLength } = data.item;

                  return (
                    <ListItem
                      key={id.toString()}
                      title={
                        <View style={styles.CardItemWrapper}>
                          <Text key={uuid.v1()}>{title}</Text>
                          <Badge
                            key={uuid.v1()}
                            value={commentsLength}
                            containerStyle={styles.Badge}
                            status="primary"
                          />
                        </View>
                      }
                      containerStyle={styles.Card}
                      onPress={() => {
                        navigation.navigate("Card", {
                          id,
                          title,
                          description
                        });
                      }}
                    />
                  );
                }}
                renderHiddenItem={(data, rowMap) => (
                  <Button
                    title="Delete"
                    onPress={() =>
                      dispatch(deleteCard({ token, id: data.item.id }))
                    }
                    buttonStyle={styles.ButtonDelete}
                    containerStyle={styles.ButtonDeleteContainer}
                  />
                )}
                rightOpenValue={-70}
                stopRightSwipe={-70}
                disableRightSwipe
              />
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Body: {
    backgroundColor: "#fff",
    flex: 1
  },
  AddPrayer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderColor: "#c6c9cc",
    borderRadius: 10
  },
  Button: {
    backgroundColor: "transparent"
  },
  ButtonTitle: {
    color: "#72a8bc",
    fontSize: 20
  },
  ButtonDelete: {
    backgroundColor: "#ac5253",
    width: 70,
    flex: 1,
    borderRadius: 0
  },
  ButtonDeleteContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  Card: {
    borderBottomWidth: 1,
    borderColor: "#c6c9cc",
    height: 70
  },
  CardItemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const mapStateToProps = (state, props) => {
  const { login, cards } = state;

  return {
    token: login.login.token,
    cards: getColumnCards(state, props.route.params.id),
    getCardsState: cards.getCardsState
  };
};

export default connect(mapStateToProps)(ColumnItem);
