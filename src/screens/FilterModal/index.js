// @flow
import React, { PureComponent } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import Button from "../../components/Button";
import Touchable from "../../components/Touchable";
import ContentPadding, {
  calculateHorizontalPadding
} from "../../components/ContentPadding";
import {
  interestButtonTextColor,
  filterBgColor,
  bgColor
} from "../../constants/colors";

const CancelButton = ({ onPress }: { onPress: () => void }) => (
  <Touchable onPress={onPress}>
    <Text style={{ color: interestButtonTextColor }}>Cancel</Text>
  </Touchable>
);

class FilterModal extends PureComponent<{}> {
  static navigationOptions = {
    title: "Filter Events",
    headerLeft: CancelButton,
    headerStyle: {
      backgroundColor: filterBgColor,
      paddingHorizontal: calculateHorizontalPadding()
    },
    headerTitleStyle: { color: "white" }
  };

  render() {
    return (
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.flex}>
          <ContentPadding>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
            <Text>Filter Events</Text>
          </ContentPadding>
        </ScrollView>
        <View style={styles.footer}>
          <ContentPadding>
            <Button text="Show 23 events" />
          </ContentPadding>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: bgColor
  },
  footer: {
    height: 60,
    paddingVertical: 8,
    backgroundColor: bgColor
  }
});

export default FilterModal;
