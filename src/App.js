// @flow
import React from "react";
import { StatusBar, StyleSheet, UIManager } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { lightNavyBlueColor } from "./constants/colors";
import Navigation from "./Navigation";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const App = () => (
  <SafeAreaView
    forceInset={{ top: "always", bottom: "never" }}
    style={styles.container}
  >
    <StatusBar
      animated
      barStyle="light-content"
      backgroundColor={lightNavyBlueColor}
    />
    <Navigation />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightNavyBlueColor
  }
});

export default App;
