// @flow

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MapView, { Polyline } from "react-native-maps";
import { createMaterialTopTabNavigator } from "react-navigation";

import { PARADE_INFORMATION, PARADE_MAP } from "../../constants/routes";
import ParadeInformationScreen from "../ParadeInformationScreen";
import ParadeMapScreen from "../ParadeMapScreen";
import DonateScreen from "../DonateScreen";
import SponsorScreen from "../SponsorScreen";
import { tabBarBgColor } from "../../constants/colors";
import text from "../../constants/text";

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

const ParadeTabNavigator = createMaterialTopTabNavigator(
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
      indicatorStyle: {
        top: 0
      },
      upperCaseLabel: false
    }
  }
);

export default ParadeTabNavigator;
