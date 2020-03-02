import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import columnsList from "../../reducers/columnsList";
import { getColumns } from "../../selectors/columns";
import { Header, ListItem } from "react-native-elements";
import { connect } from "react-redux";

class Layout extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: "#fff"
          }}
          style={styles.header}
          centerComponent={{
            text: "My Desc",
            style: { fontSize: 22 }
          }}
          rightComponent={{
            text: "+",
            style: { fontSize: 42 }
          }}
        />
        <View style={styles.list}>
          {this.props.columns.map(column => {
            return (
              <ListItem
                key={column.id}
                title={column.name}
                containerStyle={{
                  borderWidth: 1,
                  marginBottom: 10,
                  borderRadius: 10
                }}
              />
            );
          })}
        </View>
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
