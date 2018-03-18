// @flow
import { View } from "react-native";
import React from "react";
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";
import EventsScreen from "./screens/EventsScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import HomeScreen from "./screens/HomeScreen";
import { EVENT_LIST, EVENT_DETAILS, HOME } from "./constants/routes";

const EventsStack = StackNavigator(
  {
    [EVENT_LIST]: { screen: EventsScreen, tabBarLabel: "Events" },
    [EVENT_DETAILS]: { screen: EventDetailsScreen, tabBarLabel: "Events" }
  },
  {
    initialRouteName: EVENT_LIST
  }
);
const HomeStack = StackNavigator(
  {
    [HOME]: { screen: HomeScreen, tabBarLabel: "Events" },
    [EVENT_DETAILS]: { screen: EventDetailsScreen, tabBarLabel: "Events" }
  },
  {
    initialRouteName: HOME
  }
);

EventsStack.navigationOptions = {
  tabBarTestIDProps: {
    testID: "events-tab-button",
    accessibilityLabel: "events-tab-button"
  }
};

HomeStack.navigationOptions = {
  tabBarTestIDProps: {
    testID: "home-tab-button",
    accessibilityLabel: "home-tab-button"
  }
};

export default TabNavigator(
  {
    Home: { screen: HomeStack },
    Events: { screen: EventsStack },
    Parade: { screen: () => <View /> },
    Saved: { screen: () => <View /> },
    More: { screen: () => <View /> }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    initialRouteName: "Events"
  }
);
