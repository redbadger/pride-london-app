// @flow
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import supportUsAsIndividual from "../../../assets/images/supportUsAsIndividual.jpg";
import supportUsAsBusiness from "../../../assets/images/supportUsAsBusiness.jpg";
import supportUsDonateBgBottomLeft from "../../../assets/images/supportUsDonateBgBottomLeft.png";
import supportUsDonateBgTopRight from "../../../assets/images/supportUsDonateBgTopRight.png";
import supportUsVolunteerBgTopRight from "../../../assets/images/supportUsVolunteerBgTopRight.png";
import supportUsShopBgBottomRight from "../../../assets/images/supportUsShopBgBottomRight.png";
import supportUsSponsorBgTopRight from "../../../assets/images/supportUsSponsorBgTopRight.png";
import Header from "../../components/Header";
import Text from "../../components/Text";
import ContentPadding from "../../components/ContentPadding";
import {
  lightNavyBlueColor,
  warmPinkColor,
  vomitYellowColor,
  turquoiseBlueColor,
  whiteColor
} from "../../constants/colors";
import { DONATE, SPONSOR } from "../../constants/routes";
import text from "../../constants/text";
import SupportUsButton from "./SupportUsButton";
import SupportUsSectionHeader from "./SupportUsSectionHeader";

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

const EventDetailsScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Header>
      <ContentPadding style={styles.headerContent}>
        <Text type="h2" style={styles.headerTitle}>
          {text.supportUsTitle}
        </Text>
      </ContentPadding>
    </Header>
    <ScrollView>
      <View style={styles.scrollContainer}>
        <SupportUsSectionHeader
          image={supportUsAsIndividual}
          title={text.supportUsAsIndividual}
        />
        <ContentPadding style={styles.sectionSpacing}>
          <SupportUsButton
            color={lightNavyBlueColor}
            title={text.supportUsDonate}
            description={text.supportUsDonateDescription}
            bgBottomLeft={supportUsDonateBgBottomLeft}
            bgTopRight={supportUsDonateBgTopRight}
            navigation={navigation}
            url={DONATE}
            style={styles.buttonSpacing}
          />
          <SupportUsButton
            color={warmPinkColor}
            title={text.supportUsVolunteer}
            description={text.supportUsVolunteerDescription}
            bgTopRight={supportUsVolunteerBgTopRight}
            navigation={navigation}
            url="https://example.com"
            isExternalLink
            style={styles.buttonSpacing}
          />
          <SupportUsButton
            color={vomitYellowColor}
            title={text.supportUsShop}
            description={text.supportUsShopDescription}
            bgBottomRight={supportUsShopBgBottomRight}
            navigation={navigation}
            url="https://example.com"
            isExternalLink
            contrast
            style={styles.buttonSpacing}
          />
        </ContentPadding>
        <SupportUsSectionHeader
          image={supportUsAsBusiness}
          title={text.supportUsAsBusiness}
        />
        <ContentPadding style={styles.sectionSpacing}>
          <SupportUsButton
            color={turquoiseBlueColor}
            title={text.supportUsSponsor}
            description={text.supportUsSponsorDescription}
            bgTopRight={supportUsSponsorBgTopRight}
            navigation={navigation}
            url={SPONSOR}
            style={styles.buttonSpacing}
          />
        </ContentPadding>
      </View>
    </ScrollView>
  </View>
);

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
  headerContent: {
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  headerTitle: {
    color: whiteColor
  },
  sectionSpacing: {
    marginBottom: 16
  },
  buttonSpacing: {
    marginTop: 12
  }
});

export default EventDetailsScreen;
