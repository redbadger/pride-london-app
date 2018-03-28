// @flow
import React, { PureComponent } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import Button from "../../components/Button";
import Touchable from "../../components/Touchable";
import ContentPadding, {
  calculateHorizontalPadding
} from "../../components/ContentPadding";
import SectionHeader from "../../components/SectionHeader";
import CheckBox from "../../components/CheckBox";
import {
  interestButtonTextColor,
  filterBgColor,
  bgColor,
  filterModalShadow
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
      <SafeAreaView style={styles.flex} forceInset={{ bottom: "always" }}>
        <ScrollView style={styles.flex}>
          <SectionHeader title="Price" hasShadow={false} />
          <ContentPadding>
            <CheckBox
              onChange={() => {}}
              checked
              label="Show only free events"
            />
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
    backgroundColor: bgColor,

    // ios shadow
    shadowColor: filterModalShadow,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.6,
    shadowRadius: 5,

    // android shadow
    borderWidth: 0,
    elevation: 3,
    marginTop: 6
  }
});

export default FilterModal;
