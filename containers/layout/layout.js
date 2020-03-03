import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import columnsList from "../../reducers/columnsList";
import AddColumn from "../../components/columns/addColumn/addColumn";
import { getColumns } from "../../selectors/columns";
import { Header, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

class Layout extends Component {
  state = {
    modalVisible: false
  };

  render() {
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
          {this.props.columns.map(column => {
            return (
              <ListItem
                key={column.id}
                title={column.name}
                onPress={() => {
                  this.props.navigation.navigate("Column", {
                    colId: column.id,
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
        </View>
        <AddColumn
          visible={this.state.modalVisible}
          modalHide={() => this.setState({ modalVisible: false })}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    columns: getColumns(state)
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch"
  },
  list: {
    padding: 20
  }
});

export default connect(mapStateToProps)(Layout);
