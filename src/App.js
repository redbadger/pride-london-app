// @flow
import React from "react";
import { StatusBar, StyleSheet, UIManager } from "react-native";
import type { NavigationState } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import { lightNavyBlueColor } from "./constants/colors";
import Navigation from "./Navigation";

export type Props = {
  onNavigationStateChange: (NavigationState, NavigationState) => void
};

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = ({ onNavigationStateChange }: Props) => (
  <SafeAreaView
    forceInset={{ top: "always", bottom: "never" }}
    style={styles.container}
  >
    <StatusBar
      animated
      barStyle="light-content"
      backgroundColor={lightNavyBlueColor}
    />
    <Navigation onNavigationStateChange={onNavigationStateChange} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightNavyBlueColor
  }
});

export default App;
