// @flow
import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Image, StyleSheet, View } from "react-native";
import type { TabScene } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";

import EventsScreen from "./screens/EventsScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import FeaturedEventListScreen from "./screens/FeaturedEventListScreen";
import HomeScreen from "./screens/HomeScreen";
import CategoriesFilterScreen from "./screens/CategoriesFilterScreen";
import SupportUsScreen from "./screens/SupportUsScreen";
import SponsorScreen from "./screens/SponsorScreen";
import iconHomeActive from "../assets/images/homeActive.png";
import iconHomeDefault from "../assets/images/homeDefault.png";
import iconEventsActive from "../assets/images/eventsActive.png";
import iconEventsDefault from "../assets/images/eventsDefault.png";
import iconParadeActive from "../assets/images/paradeActive.png";
import iconParadeDefault from "../assets/images/paradeDefault.png";
import iconSavedActive from "../assets/images/savedActive.png";
import iconSavedDefault from "../assets/images/savedDefault.png";
import iconSupportUsActive from "../assets/images/supportUsActive.png";
import iconSupportUsDefault from "../assets/images/supportUsDefault.png";
import { transparent, tabBarShadowColor } from "./constants/colors";
import {
  EVENT_LIST,
  EVENT_DETAILS,
  FEATURED_EVENT_LIST,
  HOME,
  EVENT_CATEGORIES_FILTER,
  PARADE,
  SAVED,
  SUPPORT_US,
  DONATE,
  SPONSOR
} from "./constants/routes";
import text from "./constants/text";
import NavigationTabBar from "./components/NavigationTabBar";
import type { ImageRef } from "./data/image-ref";

const tabIcon = (defaultIcon: ImageRef, activeIcon: ImageRef) => ({
  focused
}: TabScene) => (
  <Image source={focused ? activeIcon : defaultIcon} width={28} height={28} />
);

const withShadow = Component => props => (
  <View style={styles.shadowContainer}>
    <Component {...props} />
    <LinearGradient
      colors={[transparent, tabBarShadowColor]}
      style={styles.shadow}
    />
  </View>
);

const styles = StyleSheet.create({
  shadowContainer: {
    flex: 1
  },
  shadow: {
    width: "100%",
    height: 7,
    position: "absolute",
    left: 0,
    bottom: 0
  }
});

const HomeStack = StackNavigator(
  {
    [HOME]: { screen: withShadow(HomeScreen) },
    [EVENT_DETAILS]: { screen: EventDetailsScreen },
    [FEATURED_EVENT_LIST]: { screen: FeaturedEventListScreen }
  },
  {
    initialRouteName: HOME,
    navigationOptions: {
      tabBarIcon: tabIcon(iconHomeDefault, iconHomeActive),
      tabBarLabel: text.tabHome,
      tabBarTestIDProps: {
        testID: "home-tab-button"
      }
    },
    headerMode: "none"
  }
);

const EventsStack = StackNavigator(
  {
    [EVENT_LIST]: { screen: withShadow(EventsScreen) },
    [EVENT_DETAILS]: { screen: EventDetailsScreen },
    [EVENT_CATEGORIES_FILTER]: { screen: CategoriesFilterScreen }
  },
  {
    initialRouteName: EVENT_LIST,
    navigationOptions: {
      tabBarIcon: tabIcon(iconEventsDefault, iconEventsActive),
      tabBarLabel: text.tabEvents,
      tabBarTestIDProps: {
        testID: "events-tab-button"
      }
    },
    headerMode: "none"
  }
);

const ParadeStack = StackNavigator(
  {
    [PARADE]: { screen: withShadow(() => <View />) }
  },
  {
    initialRouteName: PARADE,
    navigationOptions: {
      tabBarIcon: tabIcon(iconParadeDefault, iconParadeActive),
      tabBarLabel: text.tabParade
    },
    headerMode: "none"
  }
);

const SavedStack = StackNavigator(
  {
    [SAVED]: { screen: withShadow(() => <View />) }
  },
  {
    initialRouteName: SAVED,
    navigationOptions: {
      tabBarIcon: tabIcon(iconSavedDefault, iconSavedActive),
      tabBarLabel: text.tabSaved
    },
    headerMode: "none"
  }
);

const SupportUsStack = StackNavigator(
  {
    [SUPPORT_US]: { screen: withShadow(SupportUsScreen) },
    [DONATE]: { screen: withShadow(() => <View />) },
    [SPONSOR]: { screen: SponsorScreen }
  },
  {
    initialRouteName: SPONSOR,
    navigationOptions: {
      tabBarIcon: tabIcon(iconSupportUsDefault, iconSupportUsActive),
      tabBarLabel: text.tabSupportUs
    },
    headerMode: "none"
  }
);

export default TabNavigator(
  {
    [HOME]: { screen: HomeStack },
    [EVENT_LIST]: { screen: EventsStack },
    [PARADE]: { screen: ParadeStack },
    [SAVED]: { screen: SavedStack },
    [SUPPORT_US]: { screen: SupportUsStack }
  },
  {
    tabBarComponent: NavigationTabBar,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: HOME
  }
);
