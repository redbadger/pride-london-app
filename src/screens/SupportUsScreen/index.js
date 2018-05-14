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
import ButtonWithShapes from "../../components/ButtonWithShapes";
import ContentPadding from "../../components/ContentPadding";
import Header from "../../components/Header";
import ImageHeader from "../../components/ImageHeader";
import {
  lightNavyBlueColor,
  warmPinkColor,
  vomitYellowColor,
  turquoiseBlueColor,
  whiteColor
} from "../../constants/colors";
import { DONATE, SPONSOR } from "../../constants/routes";
import text from "../../constants/text";

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

const SupportUsScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Header title={text.supportUsTitle} testID="page-heading-support-us" />
    <ScrollView>
      <View style={styles.scrollContainer}>
        <ImageHeader
          image={supportUsAsIndividual}
          title={text.supportUsAsIndividual}
        />
        <ContentPadding style={styles.sectionSpacing}>
          <ButtonWithShapes
            color={lightNavyBlueColor}
            title={text.supportUsDonate}
            description={text.supportUsDonateDescription}
            bgBottomLeft={supportUsDonateBgBottomLeft}
            bgTopRight={supportUsDonateBgTopRight}
            navigation={navigation}
            url={DONATE}
            style={styles.buttonSpacing}
          />
          <ButtonWithShapes
            color={warmPinkColor}
            title={text.supportUsVolunteer}
            description={text.supportUsVolunteerDescription}
            bgTopRight={supportUsVolunteerBgTopRight}
            navigation={navigation}
            url="https://prideinlondon.org/volunteer"
            style={styles.buttonSpacing}
          />
          <ButtonWithShapes
            color={vomitYellowColor}
            title={text.supportUsShop}
            description={text.supportUsShopDescription}
            bgBottomRight={supportUsShopBgBottomRight}
            navigation={navigation}
            url="https://www.thegayshop.co.uk/product-category/pride/pride-in-london-shop/"
            contrast
            style={styles.buttonSpacing}
          />
        </ContentPadding>
        <ImageHeader
          image={supportUsAsBusiness}
          title={text.supportUsAsBusiness}
        />
        <ContentPadding style={styles.sectionSpacing}>
          <ButtonWithShapes
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
  sectionSpacing: {
    marginBottom: 16
  },
  buttonSpacing: {
    marginTop: 12
  }
});

export default SupportUsScreen;
