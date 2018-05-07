// @flow
import React from "react";
import { View, StyleSheet, Image, Linking } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import SponsorLogo from "./SponsorLogo";
import sponsorHeadline from "../../../assets/images/sponsorHeadline.png";
import sponsorGold from "../../../assets/images/sponsorGold.png";
import sponsorSilver from "../../../assets/images/sponsorSilver.png";
import sponsorBronze from "../../../assets/images/sponsorBronze.png";
import Text from "../../components/Text";
import Touchable from "../../components/Touchable";
import text from "../../constants/text";
import { sponsorLogoBackgroundColor } from "../../constants/colors";
import type { SponsorLevel, Sponsor } from "../../data/sponsor";
import type { FieldRef } from "../../data/field-ref";
import type { ImageSource } from "../../data/get-asset-source";

import locale from "../../data/locale";

type Props = {
  sponsorLevel: SponsorLevel,
  sponsors: Sponsor[],
  getAssetSource: FieldRef => ImageSource,
  style?: ViewStyleProp
};

const sponsorLevelIcons = {
  Headline: sponsorHeadline,
  Gold: sponsorGold,
  Silver: sponsorSilver,
  Bronze: sponsorBronze
};

const SponsorLogoContainer = ({
  sponsorLevel,
  getAssetSource,
  sponsors,
  style
}: Props) => (
  <View style={style}>
    <View style={styles.header}>
      <Image source={sponsorLevelIcons[sponsorLevel]} />
      <Text style={styles.sponsorHeading} type="h3" color="lightNavyBlueColor">
        {sponsorLevel} {text.sponsorLevelHeading}
      </Text>
    </View>

    <View style={styles.logoRow}>
      {sponsors &&
        sponsors.map((sponsor, index) => (
          <View
            key={sponsor.sys.id}
            style={
              sponsorLevel === "Headline" || sponsorLevel === "Gold"
                ? [
                    styles.tileTwoColumns,
                    index % 2 !== 0 && styles.optionalePadding
                  ]
                : [
                    styles.tileThreeColumns,
                    index % 3 !== 0 && styles.optionalePadding
                  ]
            }
          >
            <Touchable
              style={styles.sponsorTile}
              onPress={() => Linking.openURL(sponsor.fields.sponsorUrl[locale])}
              accessibilityTraits={["link"]}
              testID={`sponsor-tile-${sponsor.sys.id}`}
            >
              <SponsorLogo
                sponsorName={sponsor.fields.sponsorName[locale]}
                sponsorLevel={sponsor.fields.sponsorLevel[locale]}
                sponsorLogo={getAssetSource(sponsor.fields.sponsorLogo[locale])}
              />
            </Touchable>
          </View>
        ))}
    </View>
  </View>
);

SponsorLogoContainer.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row"
  },
  tileTwoColumns: {
    width: "50%",
    marginBottom: 8
  },
  tileThreeColumns: {
    width: "33%",
    marginBottom: 8
  },
  optionalePadding: {
    paddingLeft: 8
  },
  logoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12
  },
  sponsorTile: {
    height: 100,
    alignItems: "center",
    backgroundColor: sponsorLogoBackgroundColor
  },
  sponsorHeading: {
    marginLeft: 5,
    paddingTop: 3
  }
});

export default SponsorLogoContainer;
