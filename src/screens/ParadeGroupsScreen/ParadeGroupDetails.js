// @flow
import React, { PureComponent } from "react";
import { Linking, StyleSheet, View } from "react-native";
import type { ParadeGroup } from "../../data/parade-group";
import Text from "../../components/Text";
import TextLink from "../../components/TextLink";
import Touchable from "../../components/Touchable";
import text from "../../constants/text";

type Props = {
  paradeGroup: ParadeGroup
};

const renderURL = (label, url) => (
  <Touchable onPress={() => Linking.openURL(url)}>
    <TextLink>{label}</TextLink>
  </Touchable>
);

class ParadeGroupDetails extends PureComponent<Props> {
  render() {
    const {
      name,
      facebookUrl,
      twitterUrl,
      websiteUrl
    } = this.props.paradeGroup.fields;
    return (
      <View style={styles.container}>
        <Text style={styles.name} type="h3">
          {name}
        </Text>
        <View style={styles.links}>
          {facebookUrl &&
            renderURL(text.paradeGroups.linkLabelFacebook, facebookUrl)}
          {twitterUrl &&
            renderURL(text.paradeGroups.linkLabelTwitter, twitterUrl)}
          {websiteUrl &&
            renderURL(text.paradeGroups.linkLabelWebsite, websiteUrl)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 10
  },
  name: {
    paddingTop: 4
  },
  links: {
    alignItems: "flex-start"
  }
});

export default ParadeGroupDetails;
