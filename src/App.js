// @flow
import { View } from "react-native";
import React from "react";
import { TabNavigator } from "react-navigation";
import EventsScreen from "./screens/EventsScreen";

export default TabNavigator({
  Home: { screen: EventsScreen },
  Saved: { screen: () => <View /> },
  Parade: { screen: () => <View /> },
  Donate: { screen: () => <View /> },
  More: { screen: () => <View /> }
});
