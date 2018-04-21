// @flow
import React, { PureComponent } from "react";
import { Image, StyleSheet, ScrollView, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import chevronLeftWhite from "../../../assets/images/chevron-left-white.png";
import ContentPadding from "../../components/ContentPadding";
import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import Text from "../../components/Text";
import Touchable from "../../components/Touchable";
import { whiteColor, lightNavyBlueColor } from "../../constants/colors";
import text from "../../constants/text";
import type { LocalizedFieldRef } from "../../data/localized-field-ref";
import type { Sponsor } from "../../data/sponsor";

import locale from "../../data/locale";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  sponsors: Sponsor[],
  getAssetUrl: LocalizedFieldRef => string
};

class SponsorScreen extends PureComponent<Props> {
  static navigationOptions = {
    tabBarVisible: false
  };

  render() {
    const { navigation, sponsors, getAssetUrl } = this.props;
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
          {sponsors.map(sponsor => (
            <Touchable
              key={sponsor.sys.id}
              testID={`sponsor-${sponsor.sys.id}`}
            >
              <Image
                style={styles.image}
                source={{ uri: getAssetUrl(sponsor.fields.sponsorLogo) }}
              />
              <Text>{sponsor.fields.sponsorName[locale]}</Text>
            </Touchable>
          ))}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerTitle: {
    color: whiteColor
  },
  phantomIcon: {
    width: 48,
    height: 48
  },
  image: {
    width: 100,
    height: 100
  }
});

export default SponsorScreen;
