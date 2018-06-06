// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation";

import { PARADE_INFORMATION, PARADE_MAP } from "../../constants/routes";
import ParadeInformationScreen from "../ParadeInformationScreen";
import ParadeMapScreen from "../ParadeMapScreen";
import Text from "../../components/Text";
import { lightTealColor, darkBlueGreyColor } from "../../constants/colors";
import text from "../../constants/text";

const ParadeTabNav = createMaterialTopTabNavigator(
  {
    [PARADE_MAP]: {
      screen: ParadeMapScreen,
      navigationOptions: {
        tabBarLabel: ({ focused: boolean, tintColor: string }) => (
          <View style={styles.view}>
            <Text testID="parade-map-button" type="xSmall" style={styles.text}>
              {text.tabParadeMap}
            </Text>
          </View>
        )
      }
    },
    [PARADE_INFORMATION]: {
      screen: ParadeInformationScreen,
      navigationOptions: {
        tabBarLabel: ({ focused: boolean, tintColor: string }) => (
          <View style={styles.view}>
            <Text
              testID="parade-information-button"
              type="xSmall"
              style={styles.text}
            >
              {text.tabParadeStages}
            </Text>
          </View>
        )
      }
    }
  },
  {
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
      upperCaseLabel: false
    }
  }
);

const styles = StyleSheet.create({
  view: {
    height: 33,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: lightTealColor
  }
});

export default ParadeTabNav;
