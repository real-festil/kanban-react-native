import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Header,
  Input,
  Button,
  ListItem,
  Divider,
  Avatar
} from "react-native-elements";
import Caption from "../caption/caption";
import { connect } from "react-redux";
import { deleteCard } from "../../reducers/cards";
import { editCard } from "../../actions/cards";
import {
  addComment,
  deleteComment,
  editComment
} from "../../reducers/comments";
import uuid from "react-native-uuid";
import { getCardComments } from "../../selectors/comments";
import { getCard } from "../../selectors/cards";
import Description from "../description/description";
import { SwipeListView } from "react-native-swipe-list-view";
import ChangeCommentForm from "../comments/changeCommentForm/changeCommentForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class Card extends Component {
  state = {
    commentText: "",
    modalVisible: false,
    currentCommentText: "",
    currentCommentId: ""
  };

  onAddComment = () => {
    if (this.state.commentText.trim()) {
      this.props.dispatch(
        addComment({
          id: uuid.v1(),
          cardId: this.props.card[0].id,
          value: this.state.commentText
        })
      );
      this.setState({ commentText: "" });
    }
  };

  render() {
    const { id, title, description } = this.props.card[0];
    const { dispatch, comments, token } = this.props;

    return (
      <View style={styles.Body}>
        <Header
          containerStyle={styles.Header}
          centerComponent={
            <Caption
              value={title}
              color="white"
              editName={title =>
                dispatch(editCard({ token, id, fields: { title } }))
              }
            />
          }
        />
        <Description
          cardDesc={description}
          descChange={description =>
            dispatch(editCard({ token, id, fields: { description } }))
          }
        />
        <Divider />
        <Text style={styles.CommentsHeader}>Comments:</Text>
        <ScrollView style={styles.List}>
          <SwipeListView
            data={comments}
            renderItem={(data, rowMap) => (
              <ListItem
                key={id}
                title={
                  <View style={styles.CommentContent}>
                    <Avatar
                      rounded
                      title="UN"
                      containerStyle={styles.CommentAvatar}
                    />
                    <View>
                      <Text style={styles.CommentName}>UserName</Text>
                      <Text>{data.item.value}</Text>
                    </View>
                  </View>
                }
                containerStyle={styles.Comment}
              />
            )}
            renderHiddenItem={(data, rowMap) => {
              const { value, id } = data.item;

              return (
                <View style={styles.RowBack}>
                  <Button
                    title="Change"
                    onPress={() =>
                      this.setState({
                        currentCommentText: value,
                        currentCommentId: id,
                        modalVisible: true
                      })
                    }
                    buttonStyle={styles.ChangeButton}
                  />
                  <Button
                    title="Delete"
                    onPress={() => dispatch(deleteComment({ id }))}
                    buttonStyle={styles.DeleteButton}
                  />
                </View>
              );
            }}
            rightOpenValue={-140}
            stopRightSwipe={-140}
            disableRightSwipe
          />
        </ScrollView>

        <View style={styles.AddCommentWrapper}>
          <KeyboardAwareScrollView enableOnAndroid>
            <View style={styles.AddComment}>
              <Button
                title="+"
                titleStyle={styles.ButtonTitle}
                buttonStyle={styles.AddButton}
                onPress={this.onAddComment}
              />
              <Input
                containerStyle={{
                  flex: 1
                }}
                inputContainerStyle={styles.InputContainer}
                onChangeText={text => this.setState({ commentText: text })}
                value={this.state.commentText}
                placeholder="Add a comment"
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
        {this.state.modalVisible && (
          <ChangeCommentForm
            visible={this.state.modalVisible}
            modalHide={() => this.setState({ modalVisible: false })}
            commentText={this.state.currentCommentText}
            id={this.state.currentCommentId}
            commentChange={(id, value) => dispatch(editComment({ id, value }))}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Body: {
    flex: 1,
    backgroundColor: "#fff"
  },
  List: {
    marginBottom: 44
  },
  AddCommentWrapper: {
    justifyContent: "flex-end",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    borderWidth: 1,
    margin: 0,
    borderColor: "gray",
    borderRadius: 0
  },
  AddComment: {
    display: "flex",
    flexDirection: "row",
    flex: 1
  },
  Header: {
    backgroundColor: "#bfb393"
  },
  RowBack: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  CommentsHeader: {
    textAlign: "center",
    fontSize: 20,
    margin: 10
  },
  Comment: {
    borderBottomWidth: 1
  },
  ButtonTitle: {
    color: "#72a8bc",
    fontSize: 20
  },
  AddButton: {
    backgroundColor: "#fff"
  },
  InputContainer: {
    borderBottomWidth: 0
  },
  DeleteButton: {
    flex: 1,
    backgroundColor: "#ac5253",
    width: 70,
    borderRadius: 0
  },
  ChangeButton: {
    flex: 1,
    width: 70,
    borderRadius: 0
  },
  CommentContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  CommentAvatar: {
    marginRight: 10
  },
  CommentName: {
    fontWeight: "bold"
  }
});

const mapStateToProps = (state, props) => {
  return {
    token: state.login.token,
    comments: getCardComments(state, props.route.params.id),
    card: getCard(state, props.route.params.id)
  };
};

export default connect(mapStateToProps)(Card);
