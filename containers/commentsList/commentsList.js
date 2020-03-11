import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import AddCommentForm from "../../components/comments/addCommentForm/addCommentForm";
import ChangeCommentForm from "../../components/comments/changeCommentForm/changeCommentForm";
import { Button, ListItem, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { getCardComments } from "../../selectors/comments";
import {
  addComment,
  editComment,
  deleteComment
} from "../../reducers/comments";
import uuid from "react-native-uuid";

class CommentsList extends Component {
  state = {
    commentText: "",
    commentId: "",
    modalVisible: false
  };

  render() {
    const { dispatch, cardId, comments, name } = this.props;
    const { commentText, commentId, modalVisible } = this.state;

    return (
      <>
        <Text style={styles.CommentsHeader}>Comments:</Text>
        <ScrollView style={styles.List}>
          <SwipeListView
            data={comments}
            renderItem={(data, rowMap) => (
              <ListItem
                key={data.item.id}
                title={
                  <View style={styles.CommentContent}>
                    <Avatar
                      rounded
                      title={name[0]}
                      containerStyle={styles.CommentAvatar}
                    />
                    <View>
                      <Text style={styles.CommentName}>{name}</Text>
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
                        commentText: value,
                        commentId: id,
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
        <AddCommentForm
          onAddComment={value =>
            dispatch(addComment({ id: uuid.v1(), cardId, value }))
          }
        />
        {modalVisible && (
          <ChangeCommentForm
            visible={modalVisible}
            modalHide={() => this.setState({ modalVisible: false })}
            commentText={commentText}
            id={commentId}
            commentChange={(id, value) => dispatch(editComment({ id, value }))}
          />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  RowBack: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  List: {
    marginBottom: 44
  },
  CommentsHeader: {
    textAlign: "center",
    fontSize: 20,
    margin: 10
  },
  Comment: {
    borderBottomWidth: 1
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
    comments: getCardComments(state, props.cardId),
    name: state.login.name
  };
};

export default connect(mapStateToProps)(CommentsList);
