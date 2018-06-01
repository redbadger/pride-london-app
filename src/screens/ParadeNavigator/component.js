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
import { transparent, tabBarShadowColor } from "../../constants/colors";

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
    [PARADE_MAP]: { screen: ParadeMapScreen },
    [PARADE_INFORMATION]: { screen: ParadeInformationScreen }
  },
  {
    swipeEnabled: true,
    animationEnabled: false,
    initialRouteName: PARADE_MAP
  }
);

export default ParadeTabNavigator;
