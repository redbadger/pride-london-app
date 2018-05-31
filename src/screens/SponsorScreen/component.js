// @flow
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { email as sendEmail } from "react-native-communications";
import SafeAreaView from "react-native-safe-area-view";
import R from "ramda";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import ContentPadding from "../../components/ContentPadding";
import Header from "../../components/Header";
import Text, { scaleFont } from "../../components/Text";
import Button from "../../components/ButtonPrimary";
import ShadowedScrollView from "../../components/ShadowedScrollView";
import SponsorLogoContainer from "./SponsorLogoContainer";
import { whiteColor, lightNavyBlueColor } from "../../constants/colors";
import text from "../../constants/text";
import type { ImageSource } from "../../data/get-asset-source";
import type { Sponsor, Reference } from "../../data/sponsor";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  sponsors: Sponsor[],
  getAssetSource: Reference => ImageSource
};

class SponsorScreen extends PureComponent<Props> {
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
    const { navigation, sponsors, getAssetSource } = this.props;

    const sortByName = R.sortBy(sponsor =>
      sponsor.fields.sponsorName.toLowerCase()
    );
    const groupSponsors = R.groupBy(
      sponsor => sponsor.fields.sponsorLevel,
      sortByName(sponsors)
    );

    return (
      <SafeAreaView style={styles.container}>
        <Header
          leftElement={
            <Header.BackButton
              onPress={() => {
                navigation.goBack(null);
              }}
            />
          }
          title={text.sponsorTitle}
        />
        <ShadowedScrollView topShadow={false} shadowOpacity={0.6}>
          <ContentPadding style={styles.scrollContainer}>
            <Text style={styles.sponsorMainHeading} type="h1">
              {text.sponsorHeadingOurPartners}
            </Text>
            <Text>{text.sponsorTextOurPartners}</Text>
            <SponsorLogoContainer
              sponsorLevel="Headline"
              sponsors={groupSponsors.Headline}
              getAssetSource={getAssetSource}
              style={styles.sponsorLogoContainerSpacingSmall}
            />
            <SponsorLogoContainer
              sponsorLevel="Gold"
              sponsors={groupSponsors.Gold}
              getAssetSource={getAssetSource}
              style={styles.sponsorLogoContainerSpacingLarge}
            />
            <SponsorLogoContainer
              sponsorLevel="Silver"
              sponsors={groupSponsors.Silver}
              getAssetSource={getAssetSource}
              style={styles.sponsorLogoContainerSpacingLarge}
            />
            <SponsorLogoContainer
              sponsorLevel="Bronze"
              sponsors={groupSponsors.Bronze}
              getAssetSource={getAssetSource}
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
      </SafeAreaView>
    );
  }
}

const markdownStyle = {
  text: {
    fontSize: scaleFont("small", 14),
    lineHeight: scaleFont("small", 20),
    color: lightNavyBlueColor
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor
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
