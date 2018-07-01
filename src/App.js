// @flow
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import type { NavigationState } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import { lightNavyBlueColor } from "./constants/colors";
import Navigation from "./Navigation";
import SplashScreen from "./screens/SplashScreen";

export type Props = {
  onNavigationStateChange: (NavigationState, NavigationState) => void
};

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
    <SplashScreen>
      <Navigation onNavigationStateChange={onNavigationStateChange} />
    </SplashScreen>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightNavyBlueColor
  }
});

export default App;
