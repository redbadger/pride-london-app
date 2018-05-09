// @flow
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import type { ImageRef } from "../data/image-ref";
import ContentPadding from "./ContentPadding";
import Text from "./Text";
import { lightNavyBlueColor, whiteColor } from "../constants/colors";

type Props = {
  image: ImageRef,
  title: string | string[]
};

const ImageHeader = ({ image, title }: Props) => (
  <ImageBackground style={styles.image} source={image} resizeMode="cover">
    <ContentPadding
      padding={{
        small: { horizontal: 8, vertical: 8 },
        medium: { horizontal: 16, vertical: 16 },
        large: { horizontal: 16, vertical: 16 }
      }}
      style={styles.contentPadding}
    >
      {(Array.isArray(title) ? title : [title]).map((line, index, all) => {
        const zIndex = all.length - index;
        return (
          <Text key={line} type="h1" style={[{ zIndex }, styles.title]}>
            {line}
          </Text>
        );
      })}
    </ContentPadding>
  </ImageBackground>
);

const styles = StyleSheet.create({
  image: {
    aspectRatio: 2 / 1,
    justifyContent: "flex-end"
  },
  contentPadding: {
    alignItems: "flex-start"
  },
  title: {
    color: lightNavyBlueColor,
    backgroundColor: whiteColor,
    marginTop: -8,
    paddingHorizontal: 8,
    paddingTop: 8
  }
});

export default ImageHeader;
