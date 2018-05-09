// @flow

import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Text from "../../components/Text";
import Header from "../../components/Header";
import ImageHeader from "../../components/ImageHeader";
import ContentPadding from "../../components/ContentPadding";
import LayoutColumn from "../../components/LayoutColumn";
import text from "../../constants/text";

import donateHeader from "../../../assets/images/donateHeader.png";

import { whiteColor } from "../../constants/colors";

const ParadeInformationScreen = () => {
  const tx = text.paradeInformationScreen;
  return (
    <View style={styles.container}>
      <Header title={tx.headerTitle} />
      <ScrollView>
        <View style={styles.scrollPage}>
          <LayoutColumn spacing={24}>
            <ContentPadding>
              <Text type="h1" color="lightNavyBlueColor">
                {tx.pageHeading}
              </Text>
              <Text type="h2" color="lightNavyBlueColor">
                {tx.pageSubheading}
              </Text>
              <Text style={styles.pageDescription}>{tx.pageDescription}</Text>
            </ContentPadding>
            {tx.stages.map(stage => (
              <View key={stage.stageHeading}>
                <ImageHeader
                  image={donateHeader}
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
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor
  },
  scrollPage: {
    paddingTop: 24,
    marginBottom: 12
  },
  pageDescription: {
    paddingTop: 12
  },
  stageDescription: {
    paddingTop: 12
  }
});

export default ParadeInformationScreen;
