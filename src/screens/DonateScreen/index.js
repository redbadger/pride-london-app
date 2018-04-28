// @flow
import React from "react";
import {
  Linking,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
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
import {
  lightNavyBlueColor,
  transparent,
  inputFieldBorderColor,
  inputFieldPlaceholderColor,
  eucalyptusGreenColor,
  whiteColor
} from "../../constants/colors";
import text from "../../constants/text";

type Props = {|
  navigation: NavigationScreenProp<NavigationState>
|};

type State = {|
  amount: ?string,
  otherAmountFocused: boolean
|};

class DonateScreen extends React.PureComponent<Props, State> {
  static navigationOptions = {
    tabBarVisible: false
  };

  state = {
    amount: null,
    otherAmountFocused: false
  };

  onOtherAmountFocused = () => {
    this.setState({ otherAmountFocused: true });
  };

  onOtherAmountBlurred = () => {
    this.setState({ otherAmountFocused: false });
  };

  onOtherAmountChanged = (amount: string) => {
    this.setState({ amount });
  };

  onDonatePress = () => {
    const amount = this.state.amount || "0";
    Linking.openURL(`https://donate.prideinlondon.org/?amount=${amount}`);
  };

  render() {
    const { amount, otherAmountFocused } = this.state;

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
            <ImageHeader image={donateHeader} title={text.donateHeaderText} />
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
              <Text
                type="h4"
                color="lightNavyBlueColor"
                style={styles.otherAmountlabelSpacing}
              >
                {text.donateOtherAmountLabel}
              </Text>
              <TextInput
                keyboardType="numeric"
                onBlur={this.onOtherAmountBlurred}
                onFocus={this.onOtherAmountFocused}
                onChangeText={this.onOtherAmountChanged}
                placeholder={otherAmountFocused ? "0.00" : null}
                placeholderTextColor={inputFieldPlaceholderColor}
                style={[
                  styles.otherAmount,
                  otherAmountFocused && styles.otherAmountFocused
                ]}
                underlineColorAndroid={transparent}
                value={amount}
              />
              <Text type="small" style={styles.hintSpacing}>
                {text.donateMinimumAmount}
              </Text>
              <View style={styles.ctaSpacing}>
                <Button disabled={!amount} onPress={this.onDonatePress}>
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
  otherAmount: {
    borderColor: inputFieldBorderColor,
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
    paddingHorizontal: 14,
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: lightNavyBlueColor
  },
  otherAmountFocused: {
    borderColor: eucalyptusGreenColor
  },
  hintSpacing: {
    marginTop: 10
  },
  ctaSpacing: {
    marginTop: 16,
    paddingVertical: 12
  }
});

export default DonateScreen;
