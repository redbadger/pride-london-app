// @flow
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { email as sendEmail } from "react-native-communications";
import R from "ramda";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import chevronLeftWhite from "../../../assets/images/chevron-left-white.png";
import ContentPadding from "../../components/ContentPadding";
import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import Text from "../../components/Text";
import Button from "../../components/ButtonPrimary";
import ShadowedScrollView from "../../components/ShadowedScrollView";
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

  sponsorEmailButtonPress = () => {
    sendEmail(
      ["sponsor@prideinlondon.org"],
      null,
      null,
      text.sponsorContactEmailSubject,
      null
    );
  };

  render() {
    const { navigation, sponsors, getAssetUrl, getAssetSize } = this.props;

    const sortByName = R.sortBy(sponsor =>
      sponsor.fields.sponsorName[locale].toLowerCase()
    );
    const groupSponsors = R.groupBy(
      sponsor => sponsor.fields.sponsorLevel[locale],
      sortByName(sponsors)
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
        <ShadowedScrollView topShadow={false} shadowOpacity={0.6}>
          <ContentPadding style={styles.scrollContainer}>
            <Text style={styles.sponsorMainHeading} type="h1">
              {text.sponsorHeadingOurPartners}
            </Text>
            <Text>{text.sponsorTextOurPartners}</Text>
            <SponsorLogoContainer
              sponsorLevel="Headline"
              sponsors={groupSponsors.Headline}
              getAssetUrl={getAssetUrl}
              getAssetSize={getAssetSize}
              style={styles.sponsorLogoContainerSpacingSmall}
            />
            <SponsorLogoContainer
              sponsorLevel="Gold"
              sponsors={groupSponsors.Gold}
              getAssetUrl={getAssetUrl}
              getAssetSize={getAssetSize}
              style={styles.sponsorLogoContainerSpacingLarge}
            />
            <SponsorLogoContainer
              sponsorLevel="Silver"
              sponsors={groupSponsors.Silver}
              getAssetUrl={getAssetUrl}
              getAssetSize={getAssetSize}
              style={styles.sponsorLogoContainerSpacingLarge}
            />
            <SponsorLogoContainer
              sponsorLevel="Bronze"
              sponsors={groupSponsors.Bronze}
              getAssetUrl={getAssetUrl}
              getAssetSize={getAssetSize}
              style={styles.sponsorLogoContainerSpacingLarge}
            />
            <Text style={styles.sponsorMainHeading} type="h1">
              {text.sponsorHeadingPartnerWithUs}
            </Text>
            <Text style={styles.sponsorTextPartnerWithUs}>
              {text.sponsorTextPartnerWithUs}
            </Text>
            <Text markdown markdownStyle={markdownStyle}>
              {text.sponsorTextPartnerWithUsList}
            </Text>
          </ContentPadding>
        </ShadowedScrollView>
        <View style={styles.footer}>
          <ContentPadding>
            <Button
              onPress={this.sponsorEmailButtonPress}
              testID="emailLauncher"
            >
              {text.sponsorContactButtonText}
            </Button>
          </ContentPadding>
        </View>
      </View>
    );
  }
}

const markdownStyle = {
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: lightNavyBlueColor
  }
};

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
  sponsorTextPartnerWithUs: {
    paddingBottom: 10
  },
  sponsorLogoContainerSpacingSmall: {
    marginTop: 16
  },
  sponsorLogoContainerSpacingLarge: {
    marginTop: 20
  },
  footer: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    paddingVertical: 12
  }
});

export default SponsorScreen;
