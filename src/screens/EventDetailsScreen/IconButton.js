// @flow
import React from "react";
import { Image, StyleSheet } from "react-native";
import Touchable from "../../components/Touchable";

type Props = {
  onPress: Function,
  source: Image.propTypes.source
};

const IconButton = ({ onPress, source }: Props) => (
  <Touchable onPress={onPress}>
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
