// @flow
import React from "react";
import {
  KeyboardAvoidingView,
  Linking,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import chevronLeftWhite from "../../../assets/images/chevron-left-white.png";
import donateHeader from "../../../assets/images/donateHeader.png";
import Button from "../../components/ButtonPrimary";
import Header from "../../components/Header";
import ImageHeader from "../../components/ImageHeader";
import IconButton from "../../components/IconButton";
import Text from "../../components/Text";
import ContentPadding from "../../components/ContentPadding";
import { lightNavyBlueColor, whiteColor } from "../../constants/colors";
import text from "../../constants/text";
import NumberTextField from "./NumberTextField";
import SegmentedControl from "./SegmentedControl";

type Props = {|
  navigation: NavigationScreenProp<NavigationState>
|};

type State = {|
  selectedAmount: ?string,
  otherAmount: ?string
|};

const selectableAmounts = ["£5", "£10", "£20"];

class DonateScreen extends React.PureComponent<Props, State> {
  static navigationOptions = {
    tabBarVisible: false
  };

  state = {
    selectedAmount: null,
    otherAmount: null
  };

  onAmountSelected = (selectedAmount: string) => {
    this.setState({ selectedAmount, otherAmount: null });
  };

  onOtherAmountFocus = () => {
    this.setState({ selectedAmount: null });
  };

  onOtherAmountChange = (otherAmount: string) => {
    this.setState({ otherAmount });
  };

  onDonatePress = () => {
    const amount = this.state.amount || "0";
    Linking.openURL(
      `https://donate.prideinlondon.org/?amount=${encodeURIComponent(amount)}`
    );
  };

  render() {
    const { selectedAmount, otherAmount } = this.state;

    return (
      <View style={styles.container}>
        <Header backgroundColor={lightNavyBlueColor}>
          <ContentPadding style={styles.headerContent}>
            <IconButton
              accessibilityLabel="Back"
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
              source={chevronLeftWhite}
              testID="back"
            />
            <Text type="h2" style={styles.headerTitle}>
              {text.donateTitle}
            </Text>
            <View style={styles.phantomIcon} />
          </ContentPadding>
        </Header>
        <ScrollView>
          <KeyboardAvoidingView
            behavior="position"
            enabled
            style={styles.scrollContainer}
          >
            <ImageHeader image={donateHeader} title={text.donateHeader} />
            <ContentPadding>
              <Text
                type="h2"
                color="lightNavyBlueColor"
                style={styles.introHeadingSpacing}
              >
                {text.donateIntroductionHeading}
              </Text>
              <Text>{text.donateIntroduction}</Text>
              <Text
                type="h3"
                color="lightNavyBlueColor"
                style={styles.amountSelectionlabelSpacing}
              >
                {text.donateAmountSelectionLabel}
              </Text>
              <SegmentedControl
                onValueChange={this.onAmountSelected}
                selectedIndex={selectableAmounts.indexOf(selectedAmount)}
                values={selectableAmounts}
              />
              <Text
                type="h4"
                color="lightNavyBlueColor"
                style={styles.otherAmountlabelSpacing}
              >
                {text.donateOtherAmountLabel}
              </Text>
              <NumberTextField
                placeholder={(0).toFixed(2)}
                onFocus={this.onOtherAmountFocus}
                onChangeText={this.onOtherAmountChange}
                value={otherAmount}
              />
              <Text type="small" style={styles.minimumAmountSpacing}>
                {text.donateMinimumAmount}
              </Text>
              <View style={styles.ctaSpacing}>
                <Button
                  disabled={!selectedAmount && !otherAmount}
                  onPress={this.onDonatePress}
                >
                  {text.donateButtonText}
                </Button>
              </View>
            </ContentPadding>
          </KeyboardAvoidingView>
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
    width: "100%",
    maxWidth: 440,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center"
  },
  headerTitle: {
    color: whiteColor
  },
  phantomIcon: {
    width: 48,
    height: 48
  },
  scrollContainer: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center"
  },
  introHeadingSpacing: {
    marginTop: 12
  },
  amountSelectionlabelSpacing: {
    marginTop: 20,
    marginBottom: 16
  },
  otherAmountlabelSpacing: {
    marginTop: 20,
    marginBottom: 8
  },
  minimumAmountSpacing: {
    marginTop: 10
  },
  ctaSpacing: {
    marginTop: 16,
    paddingVertical: 12
  }
});

export default DonateScreen;
