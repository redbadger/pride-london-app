// @flow
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
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
import {
  transparent,
  tabBarBgColor,
  tabBarLabelColor,
  tabBarIconActiveBorderColor,
  tabBarActiveLabelColor,
  tabBarShadowColor,
  tabBarBorderColor
} from "./constants/colors";
import {
  EVENT_LIST,
  EVENT_DETAILS,
  FEATURED_EVENT_LIST,
  HOME,
  PARADE,
  SAVED,
  SUPPORT_US
} from "./constants/routes";
import text from "./constants/text";
import EventsScreen from "./screens/EventsScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import FeaturedEventListScreen from "./screens/FeaturedEventListScreen";
import HomeScreen from "./screens/HomeScreen";

const tabIcon = (defaultIcon: number, activeIcon: number) => ({
  focused
}: {
  focused: boolean
}) => (
  <View style={[styles.icon, focused && styles.iconActive]}>
    <Image source={focused ? activeIcon : defaultIcon} width={28} height={28} />
  </View>
);

const HomeStack = StackNavigator(
  {
    [HOME]: { screen: HomeScreen },
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
    }
  }
);

const EventsStack = StackNavigator(
  {
    [EVENT_LIST]: { screen: EventsScreen },
    [EVENT_DETAILS]: { screen: EventDetailsScreen }
  },
  {
    initialRouteName: EVENT_LIST,
    navigationOptions: {
      tabBarIcon: tabIcon(iconEventsDefault, iconEventsActive),
      tabBarLabel: text.tabEvents,
      tabBarTestIDProps: {
        testID: "events-tab-button"
      }
    }
  }
);

const ParadeStack = StackNavigator(
  {
    [PARADE]: { screen: () => <View /> }
  },
  {
    initialRouteName: PARADE,
    navigationOptions: {
      tabBarIcon: tabIcon(iconParadeDefault, iconParadeActive),
      tabBarLabel: text.tabParade
    }
  }
);

const SavedStack = StackNavigator(
  {
    [SAVED]: { screen: () => <View /> }
  },
  {
    initialRouteName: SAVED,
    navigationOptions: {
      tabBarIcon: tabIcon(iconSavedDefault, iconSavedActive),
      tabBarLabel: text.tabSaved
    }
  }
);

const SupportUsStack = StackNavigator(
  {
    [SUPPORT_US]: { screen: () => <View /> }
  },
  {
    initialRouteName: SUPPORT_US,
    navigationOptions: {
      tabBarIcon: tabIcon(iconSupportUsDefault, iconSupportUsActive),
      tabBarLabel: text.tabSupportUs
    }
  }
);

const TabBarBottomWithShadow = props => (
  <View style={styles.tabBarWrapper}>
    <LinearGradient
      colors={[transparent, tabBarShadowColor]}
      style={styles.shadow}
    />
    <TabBarBottom {...props} />
  </View>
);

const styles = StyleSheet.create({
  shadow: {
    width: "100%",
    height: 7,
    position: "absolute",
    left: 0,
    top: -7
  },
  icon: {
    alignItems: "center",
    borderColor: transparent,
    borderTopWidth: 3,
    paddingTop: 1,
    width: "100%"
  },
  iconActive: {
    borderColor: tabBarIconActiveBorderColor
  },
  label: {
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    lineHeight: 16,
    includeFontPadding: false
  },
  tabBar: {
    backgroundColor: transparent,
    borderTopWidth: 0,
    height: 52,
    maxWidth: 440,
    alignSelf: "center"
  },
  tabBarWrapper: {
    backgroundColor: tabBarBgColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: tabBarBorderColor
  }
});

export default TabNavigator(
  {
    [HOME]: { screen: HomeStack },
    [EVENT_LIST]: { screen: EventsStack },
    [PARADE]: { screen: ParadeStack },
    [SAVED]: { screen: SavedStack },
    [SUPPORT_US]: { screen: SupportUsStack }
  },
  {
    tabBarComponent: TabBarBottomWithShadow,
    tabBarPosition: "bottom",
    tabBarOptions: {
      adaptive: false,
      activeTintColor: tabBarActiveLabelColor,
      inactiveTintColor: tabBarLabelColor,
      labelStyle: styles.label,
      style: styles.tabBar
    },
    initialRouteName: HOME
  }
);
