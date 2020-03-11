import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class AddCommentForm extends Component {
  state = {
    commentText: ""
  };

  onAddComment = () => {
    if (this.state.commentText.trim()) {
      this.props.onAddComment(this.state.commentText);
      this.setState({ commentText: "" });
    }
  };

  render() {
    return (
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
    );
  }
}

const styles = StyleSheet.create({
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
  ButtonTitle: {
    color: "#72a8bc",
    fontSize: 20
  },
  AddButton: {
    backgroundColor: "#fff"
  },
  InputContainer: {
    borderBottomWidth: 0
  }
});

export default AddCommentForm;
