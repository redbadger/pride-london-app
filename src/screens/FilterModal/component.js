// @flow
import React, { PureComponent } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp } from "react-navigation";
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
  filterModalShadow,
  filterModalTitleColor
} from "../../constants/colors";

const CancelButton = ({ onPress }: { onPress: () => void }) => (
  <Touchable onPress={onPress}>
    <Text style={{ color: interestButtonTextColor }}>Cancel</Text>
  </Touchable>
);

type Props = {
  navigation: NavigationScreenProp<{}>,
  applyButtonText: string,
  onChange: () => void,
  onApply: () => void,
  onCancel: () => void
};

class FilterModal extends PureComponent<Props> {
  static navigationOptions = {
    title: "Filter Events",
    headerLeft: CancelButton,
    headerStyle: {
      backgroundColor: filterBgColor,
      paddingHorizontal: calculateHorizontalPadding()
    },
    headerTitleStyle: { color: filterModalTitleColor, fontWeight: "bold" }
  };

  componentDidMount() {
    this.didBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      this.props.onCancel
    );
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  didBlurSubscription: {
    remove: () => void
  };

  render() {
    const { applyButtonText, onApply, onChange } = this.props;
    return (
      <SafeAreaView style={styles.flex} forceInset={{ bottom: "always" }}>
        <ScrollView style={styles.flex}>
          <SectionHeader title="Price" hasShadow={false} />
          <ContentPadding>
            <CheckBox
              onChange={onChange}
              checked
              label="Show only free events"
            />
          </ContentPadding>
        </ScrollView>
        <View style={styles.footer}>
          <ContentPadding>
            <Button text={applyButtonText} onPress={onApply} />
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
