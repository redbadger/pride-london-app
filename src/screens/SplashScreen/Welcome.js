// @flow
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import { lightNavyBlueColor } from "../../constants/colors";
import logo from "../../../assets/images/logo.png";
import splash from "../../../assets/images/splash.png";
import heartAnimation from "../../../assets/animations/save-event-light.json";

import BadConnection from "./BadConnection";

export type Props = {
  animationProgress: ?Object,
  noDataReceived: boolean,
  loading: boolean,
  getData: () => void
};

const Welcome = ({
  animationProgress,
  noDataReceived,
  loading,
  getData
}: Props) => (
  <View style={styles.container}>
    <View style={styles.discoverPlanLove}>
      <Image source={splash} style={styles.discoverPlan} />
      <View style={styles.love}>
        <LottieView
          progress={animationProgress}
          source={heartAnimation}
          loop={false}
          style={styles.loveAnimation}
          resizeMode="cover"
        />
      </View>
    </View>
    {noDataReceived && <BadConnection loading={loading} getData={getData} />}
    {!noDataReceived && <Image source={logo} style={styles.logo} />}
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
    // these dimensions must match the native screens
    width: 172, // 342 516
    height: 236, // 472 708
    marginBottom: 200,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  discoverPlan: {
    width: 172,
    height: 236
  },
  love: {
    position: "absolute",
    bottom: 0,
    margin: 0,
    padding: 0,
    width: 120,
    height: 120,
    backgroundColor: lightNavyBlueColor
  },
  logo: {
    // same as discover plan love, must match native
    width: 172,
    height: 67,
    position: "absolute",
    bottom: 70
  },
  loveAnimation: {
    width: "100%",
    height: "100%"
  }
});

export default Welcome;
