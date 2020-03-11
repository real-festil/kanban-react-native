import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Header, Divider } from "react-native-elements";
import Caption from "../../components/caption/caption";
import { connect } from "react-redux";
import { deleteCard } from "../../reducers/cards";
import { editCard } from "../../actions/cards";
import { getCard } from "../../selectors/cards";
import Description from "../../components/description/description";
import CommentsList from "../commentsList/commentsList";

class Card extends Component {
  render() {
    const { id, title, description } = this.props.card[0];
    const { dispatch, comments, token, name, route } = this.props;

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
        <CommentsList cardId={route.params.id} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Body: {
    flex: 1,
    backgroundColor: "#fff"
  },
  Header: {
    backgroundColor: "#bfb393"
  }
});

const mapStateToProps = (state, props) => {
  return {
    token: state.login.token,
    card: getCard(state, props.route.params.id)
  };
};

export default connect(mapStateToProps)(Card);
