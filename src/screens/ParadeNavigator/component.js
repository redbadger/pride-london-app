// @flow

import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation";

import { PARADE_INFORMATION, PARADE_MAP } from "../../constants/routes";
import ParadeInformationScreen from "../ParadeInformationScreen";
import ParadeMapScreen from "../ParadeMapScreen";
import {
  lightTealColor,
  whiteColor,
  darkBlueGreyColor
} from "../../constants/colors";
import text from "../../constants/text";

const ParadeTabNav = createMaterialTopTabNavigator(
  {
    [PARADE_MAP]: {
      screen: ParadeMapScreen,
      navigationOptions: { tabBarLabel: text.tabParadeMap }
    },
    [PARADE_INFORMATION]: {
      screen: ParadeInformationScreen,
      navigationOptions: { tabBarLabel: text.tabParadeStages }
    }
  },
  {
    swipeEnabled: true,
    animationEnabled: false,
    initialRouteName: PARADE_MAP,

    tabBarOptions: {
      activeTintColor: lightTealColor,
      inactiveTintColor: whiteColor,
      indicatorStyle: {
        top: 0,
        backgroundColor: lightTealColor
      },
      style: {
        backgroundColor: darkBlueGreyColor
      },
      upperCaseLabel: false
    }
  }
);

export default ParadeTabNav;
