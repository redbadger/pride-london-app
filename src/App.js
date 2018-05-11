// @flow
import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { transparent } from "./constants/colors";
import Navigation from "./Navigation";

// The SafeAreaView cannot detect if the Android status bar is
// translucent or opaque. It falls back to assume opaque, which
// is the default for Android but means it does not add extra
// spacing. Because we always set the status bar to translucent,
// we force the SafeAreaView to add spacing on Android.
if (Platform.OS === "android") {
  SafeAreaView.setStatusBarHeight(StatusBar.currentHeight);
}

const App = () => (
  <View style={styles.container}>
    <StatusBar
      animated
      barStyle="light-content"
      backgroundColor={transparent}
      translucent
    />
    <Navigation />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
