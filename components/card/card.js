import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Header,
  Input,
  Button,
  ListItem,
  Divider
} from "react-native-elements";
import Caption from "../caption/caption";
import { connect } from "react-redux";
import { editCard, deleteCard } from "../../reducers/cards";
import { addComment, deleteComment } from "../../reducers/comments";
import uuid from "react-native-uuid";
import { getCardComments } from "../../selectors/comments";
import { getCard } from "../../selectors/cards";
import Description from "../description/description";
import { SwipeListView } from "react-native-swipe-list-view";

class Card extends Component {
  state = {
    commentText: ""
  };

  onCardDelete = () => {
    const { dispatch, navigation, route } = this.props;

    dispatch(deleteCard({ id }));
    navigation.goBack();
  };

  render() {
    const { id, name, cardDesc } = this.props.card[0];
    const { dispatch, comments } = this.props;

    return (
      <View>
        <Header
          containerStyle={{
            backgroundColor: "#fff"
          }}
          centerComponent={
            <Caption
              value={name}
              editName={name => dispatch(editCard({ id, fields: { name } }))}
            />
          }
          rightComponent={<Text onPress={this.onCardDelete}>DELETE</Text>}
        />
        <Description
          cardDesc={cardDesc}
          descChange={cardDesc =>
            dispatch(editCard({ id, fields: { cardDesc } }))
          }
        />
        <Divider />
        <View style={styles.list}>
          <SwipeListView
            data={comments}
            renderItem={(data, rowMap) => (
              <ListItem key={id} title={data.item.value} />
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.RowBack}>
                <Button title="Change" onPress={() => console.log("change")} />
                <Button
                  title="Delete"
                  onPress={() => dispatch(deleteComment({ id: data.item.id }))}
                />
              </View>
            )}
            rightOpenValue={-125}
          />
          <View style={styles.AddPrayer}>
            <Button
              title="+"
              onPress={() =>
                dispatch(
                  addComment({
                    id: uuid.v1(),
                    cardId: id,
                    value: this.state.commentText
                  })
                )
              }
            />
            <Input
              containerStyle={{
                flex: 1
              }}
              onChangeText={text => this.setState({ commentText: text })}
              value={this.state.commentText}
              placeholder="add a prayer"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    padding: 0
  },
  AddPrayer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderColor: "gray",
    borderRadius: 0
  },
  RowBack: {
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

const mapStateToProps = (state, props) => {
  return {
    comments: getCardComments(state, props.route.params.id),
    card: getCard(state, props.route.params.id)
  };
};

export default connect(mapStateToProps)(Card);
