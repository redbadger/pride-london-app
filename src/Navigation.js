// @flow
import React from "react";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Image, StyleSheet, View } from "react-native";
import type {
  TabScene,
  NavigationScreenConfigProps,
  NavigationTabScreenOptions
} from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import DonateScreen from "./screens/DonateScreen";
import EventsScreen from "./screens/EventsScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import FeaturedEventListScreen from "./screens/FeaturedEventListScreen";
import ParadeGroupsScreen from "./screens/ParadeGroupsScreen";
import ParadeMapScreen from "./screens/ParadeMapScreen";
import SavedEventListScreen from "./screens/SavedEventListScreen";
import HomeScreen from "./screens/HomeScreen";
import FilterScreen from "./screens/FilterScreen";
import CategoriesFilterScreen from "./screens/CategoriesFilterScreen";
import DateFilterScreen from "./screens/DateFilterScreen";
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
import {
  lightTealColor,
  darkBlueGreyColor,
  transparent,
  tabBarShadowColor
} from "./constants/colors";
import {
  EVENT_LIST,
  EVENT_DETAILS,
  FEATURED_EVENT_LIST,
  HOME,
  EVENT_CATEGORIES_FILTER,
  PARADE, // should be able to remove this
  PARADE_GROUPS,
  PARADE_MAP,
  SAVED_EVENT_LIST,
  SUPPORT_US,
  EVENT_ATTRIBUTE_FILTER,
  EVENT_DATE_FILTER,
  DONATE,
  SPONSOR
} from "./constants/routes";
import text from "./constants/text";
import NavigationTabBar from "./components/NavigationTabBar";
import Header from "./components/Header";
import TopTabBar from "./components/TopTabBar";
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
      pointerEvents="none"
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
  },
  card: {
    shadowOpacity: 0
  }
});

export const getTabTestId = (routeName: string) => {
  switch (routeName) {
    case HOME:
      return "home-tab-button";
    case EVENT_LIST:
      return "events-tab-button";
    case PARADE:
      return "parade-tab-button";
    case PARADE_GROUPS:
      return "parade-groups-button";
    case PARADE_MAP:
      return "parade-map-button";
    case SAVED_EVENT_LIST:
      return "saved-events-tab-button";
    case SUPPORT_US:
      return "support-us-tab-button";
    default:
      return "";
  }
};

export const hideTabBarOnSubRoutes = (
  initialRouteName: string,
  navigationOptions: NavigationTabScreenOptions
) => ({ navigation }: NavigationScreenConfigProps) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  return {
    ...navigationOptions,
    tabBarVisible: routeName === initialRouteName
  };
};

const HomeStack = createStackNavigator(
  {
    [HOME]: { screen: withShadow(HomeScreen) },
    [EVENT_DETAILS]: { screen: EventDetailsScreen },
    [FEATURED_EVENT_LIST]: {
      screen: FeaturedEventListScreen
    }
  },
  {
    initialRouteName: HOME,
    headerMode: "none",
    cardStyle: styles.card
  }
);

const EventsStack = createStackNavigator(
  {
    [EVENT_LIST]: { screen: withShadow(EventsScreen) },
    [EVENT_DETAILS]: { screen: EventDetailsScreen },
    [EVENT_CATEGORIES_FILTER]: {
      screen: CategoriesFilterScreen
    },
    [EVENT_DATE_FILTER]: { screen: DateFilterScreen },
    [EVENT_ATTRIBUTE_FILTER]: { screen: FilterScreen }
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

// We can flatten this into ParadeStack
const ParadeTabNav = createMaterialTopTabNavigator(
  {
    [PARADE_MAP]: {
      screen: ParadeMapScreen,
      navigationOptions: {
        tabBarLabel: text.tabParadeMap
      }
    },
    [PARADE_GROUPS]: {
      screen: ParadeGroupsScreen,
      navigationOptions: {
        tabBarLabel: text.tabParadeGroups
      }
    }
  },
  {
    tabBarComponent: TopTabBar,
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: PARADE_MAP,
    tabBarOptions: {
      indicatorStyle: {
        top: 0,
        backgroundColor: lightTealColor
      },
      style: {
        backgroundColor: darkBlueGreyColor
      },
      upperCaseLabel: false,
      getTabTestID: getTabTestId
    }
  }
);

const ParadeStack = createStackNavigator(
  {
    [PARADE]: { screen: ParadeTabNav },
    [EVENT_DETAILS]: { screen: EventDetailsScreen }
  },
  {
    initialRouteName: PARADE,
    navigationOptions: {
      header: (
        <Header title={text.parade.headerTitle} testID="page-heading-parade" />
      )
    },
    cardStyle: styles.card
  }
);

const SavedStack = createStackNavigator(
  {
    [SAVED_EVENT_LIST]: {
      screen: withShadow(SavedEventListScreen)
    },
    [EVENT_DETAILS]: { screen: EventDetailsScreen }
  },
  {
    initialRouteName: SAVED_EVENT_LIST,
    navigationOptions: {
      tabBarIcon: tabIcon(iconSavedDefault, iconSavedActive),
      tabBarLabel: text.tabSaved,
      tabBarTestIDProps: {
        testID: "saved-events-tab-button"
      }
    },
    headerMode: "none"
  }
);

const SupportUsStack = createStackNavigator(
  {
    [SUPPORT_US]: {
      screen: withShadow(SupportUsScreen)
    },
    [DONATE]: { screen: DonateScreen },
    [SPONSOR]: { screen: SponsorScreen }
  },
  {
    initialRouteName: SUPPORT_US,
    headerMode: "none",
    cardStyle: styles.card
  }
);

const TabNav = createBottomTabNavigator(
  {
    [HOME]: {
      screen: HomeStack,
      navigationOptions: hideTabBarOnSubRoutes(HOME, {
        tabBarIcon: tabIcon(iconHomeDefault, iconHomeActive),
        tabBarLabel: text.tabHome
      })
    },
    [EVENT_LIST]: {
      screen: EventsStack,
      navigationOptions: hideTabBarOnSubRoutes(EVENT_LIST, {
        tabBarIcon: tabIcon(iconEventsDefault, iconEventsActive),
        tabBarLabel: text.tabEvents
      })
    },
    [PARADE]: {
      screen: ParadeStack,
      navigationOptions: hideTabBarOnSubRoutes(PARADE, {
        tabBarIcon: tabIcon(iconParadeDefault, iconParadeActive),
        tabBarLabel: text.tabParade
      })
    },
    [SAVED_EVENT_LIST]: {
      screen: SavedStack,
      navigationOptions: hideTabBarOnSubRoutes(SAVED_EVENT_LIST, {
        tabBarIcon: tabIcon(iconSavedDefault, iconSavedActive),
        tabBarLabel: text.tabSaved
      })
    },
    [SUPPORT_US]: {
      screen: SupportUsStack,
      navigationOptions: hideTabBarOnSubRoutes(SUPPORT_US, {
        tabBarIcon: tabIcon(iconSupportUsDefault, iconSupportUsActive),
        tabBarLabel: text.tabSupportUs
      })
    }
  },
  {
    tabBarComponent: NavigationTabBar,
    tabBarPosition: "bottom",
    initialRouteName: HOME,
    cardStyle: {
      backgroundColor: "blue"
    },
    tabBarOptions: {
      getTabTestID: getTabTestId
    }
  }
);

// Root stack to support modal views if we need them
const RootStack = createStackNavigator(
  {
    Main: {
      screen: TabNav
    }
  },
  {
    mode: "modal",
    navigationOptions: {
      header: null
    },
    cardStyle: styles.card
  }
);

export default RootStack;
