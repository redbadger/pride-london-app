// @flow
import React from "react";
import { Image, StyleSheet } from "react-native";
import Touchable from "./Touchable";

type Props = {
  accessibilityLabel: string,
  onPress: Function,
  source: Image.propTypes.source
};

const IconButton = ({ accessibilityLabel, onPress, source }: Props) => (
  <Touchable accessibilityLabel={accessibilityLabel} onPress={onPress}>
    <Image style={styles.touchableIcon} source={source} />
  </Touchable>
);

const styles = StyleSheet.create({
  touchableIcon: {
    width: 48,
    height: 48
  }
});

export default IconButton;
