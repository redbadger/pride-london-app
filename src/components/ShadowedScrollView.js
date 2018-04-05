// @flow
import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { blackColor } from "../constants/colors";

type Props = {
  children: Array<Object>,
  style: StyleObj
};

class ShadowedScrollView extends React.PureComponent<Props> {
  render() {
    const { style, children } = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.topShadow} />
        <ScrollView>{children}</ScrollView>
        <View style={styles.bottomShadow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden"
  },
  topShadow: {
    width: "100%",
    height: 10,
    position: "absolute",
    left: 0,
    top: -10,
    backgroundColor: blackColor,
    // The below properties are required for ioS shadow
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 5
  },
  bottomShadow: {
    width: "100%",
    height: 10,
    position: "absolute",
    left: 0,
    bottom: -10,
    backgroundColor: blackColor,
    // The below properties are required for ioS shadow
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.7,
    shadowRadius: 5
  }
});

export default ShadowedScrollView;
