// @flow
import { View, Dimensions } from "react-native";
import React from "react";
import {
  TabNavigator,
  TabBarBottom,
  StackNavigator,
  DrawerNavigator
} from "react-navigation";
import EventsScreen from "./screens/EventsScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import FeaturedEventListScreen from "./screens/FeaturedEventListScreen";
import HomeScreen from "./screens/HomeScreen";
import CategoriesDrawer from "./screens/CategoriesDrawer";
import {
  EVENT_LIST,
  EVENT_DETAILS,
  FEATURED_EVENT_LIST,
  HOME
} from "./constants/routes";

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
    [HOME]: { screen: HomeScreen, tabBarLabel: "Home" },
    [EVENT_DETAILS]: { screen: EventDetailsScreen, tabBarLabel: "Home" },
    [FEATURED_EVENT_LIST]: {
      screen: FeaturedEventListScreen,
      tabBarLabel: "Home"
    }
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

const TabNavigation = TabNavigator(
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
    initialRouteName: "Home"
  }
);

const AppNavigation = DrawerNavigator(
  {
    tabs: {
      screen: TabNavigation
    }
  },
  {
    contentComponent: CategoriesDrawer,
    drawerPosition: "right",
    drawerWidth: Dimensions.get("window").width
  }
);

export default AppNavigation;
