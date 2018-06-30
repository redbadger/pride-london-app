// @flow
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import Text from "../../components/Text";

import {
  lightNavyBlueColor,
  brightLightBlueColor,
  warmPinkColor
} from "../../constants/colors";
import logo from "../../../assets/images/logo.png";
import heartAnimation from "../../../assets/animations/save-event-light.json";

export type Props = {
  animationProgress: ?Object
};

const Welcome = ({ animationProgress }: Props) => (
  <View style={styles.container}>
    <View style={styles.discoverPlanLove}>
      <View style={styles.discover}>
        <Text type="uber" style={styles.discoverText}>
          Discover
        </Text>
      </View>
      <View style={styles.plan}>
        <Text type="uber" style={styles.planText}>
          Plan
        </Text>
      </View>
      <View style={styles.love}>
        <LottieView
          progress={animationProgress}
          source={heartAnimation}
          loop={false}
        />
      </View>
    </View>
    <Image source={logo} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  discoverPlanLove: {
    marginBottom: 200,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  discover: {
    marginBottom: 20,
    paddingHorizontal: 12,
    backgroundColor: brightLightBlueColor
  },
  discoverText: {
    lineHeight: 0,
    color: lightNavyBlueColor
  },
  plan: {
    paddingHorizontal: 12,
    backgroundColor: warmPinkColor
  },
  planText: {
    lineHeight: 0,
    color: lightNavyBlueColor
  },
  love: {
    margin: 0,
    padding: 0,
    width: 120,
    height: 120
  },
  logo: {
    position: "absolute",
    bottom: 70
  }
});

export default Welcome;
