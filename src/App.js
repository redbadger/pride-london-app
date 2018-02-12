// @flow
import { View } from "react-native";
import React from "react";
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";
import EventsScreen from "./screens/EventsScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import { EVENT_LIST, EVENT_DETAILS } from "./constants/routes";

const EventsStack = StackNavigator(
  {
    [EVENT_LIST]: { screen: EventsScreen },
    [EVENT_DETAILS]: { screen: EventDetailsScreen }
  },
  {
    initialRouteName: EVENT_LIST
  }
);

export default TabNavigator(
  {
    Home: { screen: EventsStack },
    Saved: { screen: () => <View /> },
    Parade: { screen: () => <View /> },
    Donate: { screen: () => <View /> },
    More: { screen: () => <View /> }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom"
  }
);
