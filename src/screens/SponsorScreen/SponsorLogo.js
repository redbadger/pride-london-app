// @flow
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import type { SponsorLevel } from "../../data/sponsor";
import type { ImageSource } from "../../data/get-asset-source";

type Props = {
  sponsorName: string,
  sponsorLogo: ?ImageSource,
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
    <Image
      style={styles.image}
      resizeMode="contain"
      accessibilityLabel={sponsorName}
      source={sponsorLogo}
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
