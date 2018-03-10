// @flow
import React, { PureComponent } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { bgColor } from "../../constants/colors";

type Props = {
  loading: boolean
};

class HomeScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.props.loading && <Text>Loading...</Text>}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor
  }
});

export default HomeScreen;
