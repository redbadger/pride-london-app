// @flow
import React, { PureComponent } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import R from "ramda";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import chevronLeftWhite from "../../../assets/images/chevron-left-white.png";
import ContentPadding from "../../components/ContentPadding";
import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import Text from "../../components/Text";
import SponsorLogoContainer from "./SponsorLogoContainer";
import { whiteColor, lightNavyBlueColor } from "../../constants/colors";
import text from "../../constants/text";
import type { LocalizedFieldRef } from "../../data/localized-field-ref";
import type { Sponsor } from "../../data/sponsor";

import locale from "../../data/locale";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  sponsors: Sponsor[],
  getAssetUrl: LocalizedFieldRef => string,
  getAssetSize: LocalizedFieldRef => { width: number, height: number }
};

class SponsorScreen extends PureComponent<Props> {
  static navigationOptions = {
    tabBarVisible: false
  };

  render() {
    const { navigation, sponsors, getAssetUrl, getAssetSize } = this.props;

    const groupSponsors = R.groupBy(
      sponsor => sponsor.fields.sponsorLevel[locale],
      sponsors
    );

    return (
      <View style={styles.container}>
        <Header backgroundColor={lightNavyBlueColor}>
          <ContentPadding style={styles.headerContent}>
            <IconButton
              accessibilityLabel="Back"
              onPress={() => {
                navigation.goBack(null);
              }}
              source={chevronLeftWhite}
              testID="back"
            />
            <Text type="h2" style={styles.headerTitle}>
              {text.sponsorTitle}
            </Text>
            <View style={styles.phantomIcon} />
          </ContentPadding>
        </Header>
        <ScrollView>
          <ContentPadding style={styles.scrollContainer}>
            <Text style={styles.sponsorMainHeading} type="h1">
              {text.sponsorMainHeading}
            </Text>
            <Text style={styles.sponsorSubHeading}>
              {text.sponsorSubHeading}
            </Text>
            <SponsorLogoContainer
              sponsorLevel="Headline"
              sponsors={groupSponsors.Headline}
              getAssetUrl={getAssetUrl}
              getAssetSize={getAssetSize}
            />
            <SponsorLogoContainer
              sponsorLevel="Gold"
              sponsors={groupSponsors.Gold}
              getAssetUrl={getAssetUrl}
              getAssetSize={getAssetSize}
            />
            <SponsorLogoContainer
              sponsorLevel="Silver"
              sponsors={groupSponsors.Silver}
              getAssetUrl={getAssetUrl}
              getAssetSize={getAssetSize}
            />
            <SponsorLogoContainer
              sponsorLevel="Bronze"
              sponsors={groupSponsors.Bronze}
              getAssetUrl={getAssetUrl}
              getAssetSize={getAssetSize}
            />
          </ContentPadding>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor
  },
  headerContent: {
    width: "100%",
    maxWidth: 440,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center"
  },
  headerTitle: {
    color: whiteColor
  },
  phantomIcon: {
    width: 48,
    height: 48
  },
  scrollContainer: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center"
  },
  sponsorMainHeading: {
    marginTop: 24
  },
  sponsorSubHeading: {
    marginBottom: 16
  }
});

export default SponsorScreen;
