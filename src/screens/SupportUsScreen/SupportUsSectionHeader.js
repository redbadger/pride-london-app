// @flow
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import type { ImageRef } from "../../data/image-ref";
import ContentPadding from "../../components/ContentPadding";
import Text from "../../components/Text";
import { lightNavyBlueColor, whiteColor } from "../../constants/colors";

type Props = {
  image: ImageRef,
  title: string
};

const SupportUsSectionHeader = ({ image, title }: Props) => (
  <ImageBackground style={styles.image} source={image} resizeMode="cover">
    <ContentPadding
      padding={{
        small: { horizontal: 8, vertical: 8 },
        medium: { horizontal: 16, vertical: 16 },
        large: { horizontal: 16, vertical: 16 }
      }}
    >
      <Text type="h1" style={styles.title}>
        {title}
      </Text>
    </ContentPadding>
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
    paddingHorizontal: 8,
    paddingTop: 4,
    lineHeight: 36
  }
});

export default SupportUsSectionHeader;
