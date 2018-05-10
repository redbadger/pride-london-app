// @flow
import React from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { lightNavyBlueColor } from "./constants/colors";
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
  <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
    <StatusBar
      animated
      barStyle="light-content"
      backgroundColor={lightNavyBlueColor}
      translucent
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
