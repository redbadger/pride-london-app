// @flow
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import type { ImageRef } from "../data/image-ref";
import ContentPadding from "./ContentPadding";
import Text from "./Text";
import { lightNavyBlueColor, whiteColor } from "../constants/colors";

type Props = {
  image: ImageRef,
  title: string | string[],
  subtitle?: string
};

const ImageHeader = ({ image, title, subtitle }: Props) => (
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
          <Text
            key={line}
            color="lightNavyBlueColor"
            type="h1"
            style={[{ zIndex }, styles.title]}
          >
            {line}
          </Text>
        );
      })}
      {subtitle ? (
        <Text type="h2" color="whiteColor" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </ContentPadding>
  </ImageBackground>
);

ImageHeader.defaultProps = {
  subtitle: ""
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 2 / 1,
    justifyContent: "flex-end"
  },
  contentPadding: {
    alignItems: "flex-start"
  },
  title: {
    backgroundColor: whiteColor,
    marginTop: -8,
    paddingHorizontal: 8,
    paddingTop: 8
  },
  subtitle: {
    backgroundColor: lightNavyBlueColor,
    paddingHorizontal: 8,
    paddingTop: 4
  }
});

export default ImageHeader;
