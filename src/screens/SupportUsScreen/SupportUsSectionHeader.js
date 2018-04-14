// @flow
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import type { ImageRef } from "../../data/image-ref";
import Text from "../../components/Text";
import { lightNavyBlueColor, whiteColor } from "../../constants/colors";

type Props = {
  image: ImageRef,
  title: string
};

const SupportUsSectionHeader = ({ image, title }: Props) => (
  <ImageBackground style={styles.image} source={image} resizeMode="cover">
    <Text type="h1" style={styles.title}>
      {title}
    </Text>
  </ImageBackground>
);

const styles = StyleSheet.create({
  image: {
    aspectRatio: 2 / 1,
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  title: {
    backgroundColor: whiteColor,
    color: lightNavyBlueColor,
    margin: 16,
    paddingHorizontal: 8,
    lineHeight: 40
  }
});

export default SupportUsSectionHeader;
