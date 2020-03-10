import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AddColumn from "../../components/columns/addColumn/addColumn";
import Spinner from "../../components/spinner/spinner";
import { getColumns } from "../../actions/columns";
import { Header, ListItem } from "react-native-elements";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    modalVisible: false
  };

  componentDidMount() {
    this.props.dispatch(getColumns({ token: this.props.token }));
  }

  render() {
    const { getColumnsState, columns, navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: "#fff"
          }}
          centerComponent={{
            text: "My Desc",
            style: { fontSize: 22 }
          }}
          rightComponent={
            <Text
              style={{ fontSize: 26 }}
              onPress={() => this.setState({ modalVisible: true })}
            >
              +
            </Text>
          }
        />
        <View style={styles.list}>
          {getColumnsState === "requested" ? (
            <Spinner />
          ) : getColumnsState === "failed" ? (
            <Text>Something went wrong</Text>
          ) : (
            <ScrollView>
              {columns.map(column => {
                const { id, title } = column;
                return (
                  <ListItem
                    key={id}
                    title={title}
                    onPress={() => {
                      navigation.navigate("Column", {
                        id,
                        name: title
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
          )}
        </View>
        <AddColumn
          visible={this.state.modalVisible}
          modalHide={() => this.setState({ modalVisible: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch"
  },
  list: {
    padding: 20
  }
});

const mapStateToProps = state => {
  return {
    token: state.login.token,
    columns: state.columns.columnsList,
    getColumnsState: state.columns.getColumnsState
  };
};

export default connect(mapStateToProps)(Layout);
