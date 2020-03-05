import React, { Component } from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import { Button, Header, Input } from "react-native-elements";
import { connect } from "react-redux";
import uuid from "react-native-uuid";

class changeCommentForm extends Component {
  state = {
    id: this.props.id,
    commentText: this.props.commentText
  };

  onCommentChange = () => {
    const { id, commentText } = this.state;
    const { commentChange, modalHide } = this.props;

    if (commentText.trim()) {
      commentChange(id, commentText);
      modalHide();
    }
  };

  render() {
    const { visible, modalHide, commentChange } = this.props;
    const { commentText } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        presentationStyle="pageSheet"
        visible={visible}
      >
        <Header
          containerStyle={{
            backgroundColor: "#fff"
          }}
          centerComponent={{
            text: "Change comment",
            style: { fontSize: 22 }
          }}
        />
        <Input
          autoFocus
          multiline
          onChangeText={text => this.setState({ commentText: text })}
          errorStyle={{ color: "red" }}
          value={commentText}
          errorMessage={commentText.trim() ? "" : "Enter comment"}
        />
        <View style={styles.Buttons}>
          <Button title="Change comment" onPress={this.onCommentChange} />
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

export default changeCommentForm;
