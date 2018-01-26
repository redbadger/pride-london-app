// @flow

import React from "react";
import { AppRegistry, SafeAreaView, StyleSheet } from "react-native";
import App from "./App";

const Main = () => (
  <SafeAreaView style={styles.safeArea}>
    <App />
  </SafeAreaView>
);

const appColor = "#ddd"; // Color consistent with app

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: appColor
  }
});

AppRegistry.registerComponent("PrideLondonApp", () => Main);
