// @flow
import { Text, View } from "react-native";
import React from "react";
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";
import EventsScreen from "./screens/EventsScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import { EVENT_LIST, EVENT_DETAILS } from "./constants/routes";

const EventsStack = StackNavigator(
  {
    [EVENT_LIST]: { screen: EventsScreen, tabBarLabel: "Events" },
    [EVENT_DETAILS]: { screen: EventDetailsScreen, tabBarLabel: "Events" }
  },
  {
    initialRouteName: EVENT_LIST
  }
);

EventsStack.navigationOptions = {
  tabBarTestIDProps: {
    testID: "events-tab-button",
    accessibilityLabel: "events-tab-button"
  }
};

const HomeScreen = () => (
  <View testID="home-screen">
    <Text>Home</Text>
  </View>
);

HomeScreen.navigationOptions = {
  tabBarTestIDProps: {
    testID: "home-tab-button",
    accessibilityLabel: "home-tab-button"
  }
};

export default TabNavigator(
  {
    Home: { screen: HomeScreen },
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
