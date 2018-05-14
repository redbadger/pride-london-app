// @flow
import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Image, StyleSheet, View } from "react-native";
import type { TabScene } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import DonateScreen from "./screens/DonateScreen";
import EventsScreen from "./screens/EventsScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import FeaturedEventListScreen from "./screens/FeaturedEventListScreen";
import ParadeInformationScreen from "./screens/ParadeInformationScreen";
import SavedEventListScreen from "./screens/SavedEventListScreen";
import HomeScreen from "./screens/HomeScreen";
import FilterModal from "./screens/FilterModal";
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
  FILTER_MODAL,
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

const getTabTestId = (routeName: string) => {
  switch (routeName) {
    case EVENT_LIST:
      return "events-tab-button";
    default:
      return "";
  }
};

const HomeStack = createStackNavigator(
  {
    [HOME]: { screen: withShadow(HomeScreen) },
    [EVENT_DETAILS]: { screen: EventDetailsScreen },
    [FEATURED_EVENT_LIST]: { screen: FeaturedEventListScreen }
  },
  {
    initialRouteName: HOME,
    headerMode: "none"
  }
);

const EventsStack = createStackNavigator(
  {
    [EVENT_LIST]: { screen: withShadow(EventsScreen) },
    [EVENT_DETAILS]: { screen: EventDetailsScreen },
    [EVENT_CATEGORIES_FILTER]: { screen: CategoriesFilterScreen }
  },
  {
    initialRouteName: EVENT_LIST,
    headerMode: "none"
  }
);

const ParadeStack = createStackNavigator(
  {
    [PARADE]: { screen: withShadow(ParadeInformationScreen) }
  },
  {
    initialRouteName: PARADE,
    headerMode: "none"
  }
);

const SavedStack = createStackNavigator(
  {
    [SAVED]: { screen: withShadow(SavedEventListScreen) },
    [EVENT_DETAILS]: { screen: EventDetailsScreen }
  },
  {
    initialRouteName: SAVED,
    headerMode: "none"
  }
);

const SupportUsStack = createStackNavigator(
  {
    [SUPPORT_US]: { screen: withShadow(SupportUsScreen) },
    [DONATE]: { screen: DonateScreen },
    [SPONSOR]: { screen: SponsorScreen }
  },
  {
    initialRouteName: SUPPORT_US,

    headerMode: "none"
  }
);

const TabNav = createBottomTabNavigator(
  {
    [HOME]: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => {
        let { routeName } = navigation.state.routes[navigation.state.index];
        let navigationOptions = {
          tabBarIcon: tabIcon(iconHomeDefault, iconHomeActive),
          tabBarLabel: text.tabHome
        };
        if (routeName === FEATURED_EVENT_LIST) {
          navigationOptions.tabBarVisible = false;
        }

        return navigationOptions;
      }
    },
    [EVENT_LIST]: {
      screen: EventsStack,
      navigationOptions: ({ navigation }) => {
        let { routeName } = navigation.state.routes[navigation.state.index];
        let navigationOptions = {
          tabBarIcon: tabIcon(iconEventsDefault, iconEventsActive),
          tabBarLabel: text.tabEvents
        };
        if (routeName === FEATURED_EVENT_LIST) {
          navigationOptions.tabBarVisible = false;
        }

        return navigationOptions;
      }
    },
    [PARADE]: {
      screen: ParadeStack,
      navigationOptions: {
        tabBarIcon: tabIcon(iconParadeDefault, iconParadeActive),
        tabBarLabel: text.tabParade
      }
    },
    [SAVED]: {
      screen: SavedStack,
      navigationOptions: ({ navigation }) => {
        let { routeName } = navigation.state.routes[navigation.state.index];
        let navigationOptions = {
          tabBarIcon: tabIcon(iconSavedDefault, iconSavedActive),
          tabBarLabel: text.tabSaved
        };
        if (routeName === EVENT_DETAILS) {
          navigationOptions.tabBarVisible = false;
        }

        return navigationOptions;
      }
    },
    [SUPPORT_US]: {
      screen: SupportUsStack,
      navigationOptions: ({ navigation }) => {
        let { routeName } = navigation.state.routes[navigation.state.index];
        let navigationOptions = {
          tabBarIcon: tabIcon(iconSupportUsDefault, iconSupportUsActive),
          tabBarLabel: text.tabSupportUs
        };
        if (routeName === DONATE || routeName === SPONSOR) {
          navigationOptions.tabBarVisible = false;
        }

        return navigationOptions;
      }
    }
  },
  {
    tabBarComponent: NavigationTabBar,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: HOME,
    tabBarOptions: {
      getTabTestID: getTabTestId
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: TabNav
    },
    [FILTER_MODAL]: {
      screen: FilterModal
    }
  },
  {
    mode: "modal",
    navigationOptions: {
      header: null
    }
  }
);

export default RootStack;
