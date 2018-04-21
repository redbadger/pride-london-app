// @flow
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import type { SponsorLevel } from "../../data/sponsor";

type Props = {
  sponsorName: string,
  sponsorLogoUrl: string,
  sponsorLevel: SponsorLevel,
  sponsorLogoSize: { width: number, height: number }
};

const SponsorLogo = ({
  sponsorName,
  sponsorLogoUrl,
  sponsorLevel,
  sponsorLogoSize
}: Props) => (
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
      source={{ uri: sponsorLogoUrl, ...sponsorLogoSize }}
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
