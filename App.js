// @flow

import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Config from "react-native-config";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload \n Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const App = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to Pride London!</Text>
    <Text style={styles.instructions}>
      {`Contentful space ID: ${Config.CONTENTFUL_SPACE_ID}`}
    </Text>
    <Text style={styles.instructions}>To get started, edit App.js</Text>
    <Text style={styles.instructions}>{instructions}</Text>
  </View>
);

const bgColor = "#F5FCFF";
const textColor = "#333333";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgColor
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: textColor,
    marginBottom: 5
  }
});

export default App;
