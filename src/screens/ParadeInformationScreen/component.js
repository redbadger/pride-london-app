// @flow

import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import Text from "../../components/Text";
import Header from "../../components/Header";
import ImageHeader from "../../components/ImageHeader";
import ContentPadding from "../../components/ContentPadding";
import LayoutColumn from "../../components/LayoutColumn";
import text from "../../constants/text";

import trafalgarImg from "../../../assets/images/trafalgarSquare.jpg";
import cabaretImg from "../../../assets/images/cabaret.jpg";
import divaImg from "../../../assets/images/womensStage2018.jpg";
import familyImg from "../../../assets/images/familyArea.jpg";
import communityImg from "../../../assets/images/community.jpg";

import { whiteColor } from "../../constants/colors";

const mapImage = {
  trafalgar: trafalgarImg,
  cabaret: cabaretImg,
  diva: divaImg,
  family: familyImg,
  community: communityImg
};

export type Props = {};

export default class ParadeInformationScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Header
          title={text.paradeInformationScreen.headerTitle}
          testID="page-heading-parade"
        />
        <ScrollView>
          <View style={styles.scrollPage}>
            <LayoutColumn spacing={24}>
              <ContentPadding>
                <Text type="uber" color="lightNavyBlueColor">
                  {text.paradeInformationScreen.pageHeading}
                </Text>
                <Text type="h2" color="lightNavyBlueColor">
                  {text.paradeInformationScreen.pageSubheading}
                </Text>
                <Text style={styles.pageDescription}>
                  {text.paradeInformationScreen.pageDescription}
                </Text>
              </ContentPadding>
              {text.paradeInformationScreen.stages.map(stage => (
                <View key={stage.stageHeading}>
                  <ImageHeader
                    image={mapImage[stage.stageImage]}
                    title={stage.stageHeading}
                    subtitle={stage.stageSubheading}
                  />
                  <ContentPadding>
                    <Text style={styles.stageDescription}>
                      {stage.stageDescription}
                    </Text>
                  </ContentPadding>
                </View>
              ))}
            </LayoutColumn>
          </View>
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
  scrollPage: {
    paddingTop: 24,
    marginBottom: 12,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center"
  },
  pageDescription: {
    paddingTop: 12
  },
  stageDescription: {
    paddingTop: 12
  }
});

// export default ParadeInformationScreen;
