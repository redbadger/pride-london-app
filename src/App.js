// @flow

import React from "react";
import { View } from "react-native";
import { TabNavigator } from "react-navigation";
import EventsScreen from "./screens/EventsScreen";

export default TabNavigator({
  Home: { screen: EventsScreen },
  Saved: { screen: () => <View /> },
  Parade: { screen: () => <View /> },
  Donate: { screen: () => <View /> },
  More: { screen: () => <View /> }
});
