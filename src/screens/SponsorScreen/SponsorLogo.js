// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { SponsorLevel } from "../../data/sponsor";
import type { FieldRef } from "../../data/field-ref";
import ConnectedImage from "../../components/Image";

type Props = {
  sponsorName: string,
  sponsorLogo: FieldRef,
  sponsorLevel: SponsorLevel
};

const SponsorLogo = ({ sponsorName, sponsorLogo, sponsorLevel }: Props) => (
  <View
    style={
      sponsorLevel === "Headline" || sponsorLevel === "Gold"
        ? styles.sponsorImageLarge
        : styles.sponsorImageSmall
    }
  >
    <ConnectedImage
      reference={sponsorLogo}
      style={styles.image}
      resizeMode="contain"
      accessibilityLabel={sponsorName}
    />
  </View>
);

const styles = StyleSheet.create({
  sponsorImageLarge: {
    width: "75%",
    height: "48%"
  },
  sponsorImageSmall: {
    width: "80%",
    height: "48%"
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

export default SponsorLogo;
