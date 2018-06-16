// @flow
import React from "react";
import type { ElementRef } from "react";
import { Keyboard, Linking, ScrollView, StyleSheet, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import donateHeader from "../../../assets/images/donateHeader.jpg";
import Button from "../../components/ButtonPrimary";
import Header from "../../components/Header";
import ImageHeader from "../../components/ImageHeader";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import Text from "../../components/Text";
import ContentPadding from "../../components/ContentPadding";
import { whiteColor } from "../../constants/colors";
import text from "../../constants/text";
import NumberTextField from "./NumberTextField";
import SegmentedControl from "./SegmentedControl";

type Props = {|
  navigation: NavigationScreenProp<NavigationState>
|};

type State = {|
  selectedAmount: ?number,
  otherAmount: ?string
|};

const selectableAmounts = [5, 10, 20];

class DonateScreen extends React.PureComponent<Props, State> {
  state = {
    selectedAmount: null,
    otherAmount: null
  };

  componentDidMount() {
    Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
  }

  componentWillUnmount() {
    Keyboard.removeListener("keyboardDidShow", this.keyboardDidShow);
  }

  onAmountSelected = (selectedAmount: number) => {
    this.setState({
      selectedAmount,
      otherAmount: null
    });
  };

  onOtherAmountFocus = () => {
    this.setState({ selectedAmount: null });
  };

  onOtherAmountChange = (otherAmount: string) => {
    this.setState({ otherAmount });
  };

  onDonatePress = () => {
    const amount =
      this.state.selectedAmount != null
        ? String(this.state.selectedAmount)
        : this.state.otherAmount;
    const encodedAmount = encodeURIComponent(amount || "0");
    Linking.openURL(
      `https://donate.prideinlondon.org/?amount=${encodedAmount}`
    );
  };

  keyboardDidShow = () => {
    this.scrollViewRef.current.scrollToEnd();
  };

  // $FlowFixMe: For some reason flow doesn't know about React.createRef.
  scrollViewRef: ElementRef<typeof ScrollView> = React.createRef();

  renderHeader() {
    return (
      <Header
        leftElement={
          <Header.BackButton
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
          />
        }
        title={text.donateTitle}
      />
    );
  }

  renderContent() {
    const { selectedAmount, otherAmount } = this.state;
    return (
      <ScrollView ref={this.scrollViewRef}>
        <SafeAreaView style={styles.scrollContainer}>
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
              style={styles.amountSelectionLabelSpacing}
            >
              {text.donateAmountSelectionLabel}
            </Text>
            <SegmentedControl
              onValueChange={this.onAmountSelected}
              selectedValue={selectedAmount}
            >
              {selectableAmounts.map(amount => (
                <SegmentedControl.Item
                  key={amount}
                  label={`£${amount}`}
                  value={amount}
                />
              ))}
            </SegmentedControl>
            <NumberTextField
              label={text.donateOtherAmountLabel}
              placeholder={(0).toFixed(2)}
              onFocus={this.onOtherAmountFocus}
              onChangeText={this.onOtherAmountChange}
              onSubmitEditing={this.onDonatePress}
              returnKeyLabel={text.donateButtonText}
              returnKeyType="go"
              value={otherAmount}
              style={styles.otherAmountSpacing}
            />
            <Text type="small" style={styles.minimumAmountSpacing}>
              {text.donateMinimumAmount}
            </Text>
            <View style={styles.ctaSpacing}>
              <Button
                disabled={selectedAmount == null && !otherAmount}
                onPress={this.onDonatePress}
              >
                {text.donateButtonText}
              </Button>
            </View>
          </ContentPadding>
        </SafeAreaView>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.container} testID="donate-screen">
        {this.renderHeader()}
        <KeyboardAvoidingView behavior="padding" enabled style={styles.content}>
          {this.renderContent()}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor
  },
  content: {
    flex: 1
  },
  scrollContainer: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center"
  },
  introHeadingSpacing: {
    marginTop: 12
  },
  amountSelectionLabelSpacing: {
    marginTop: 20,
    marginBottom: 16
  },
  otherAmountSpacing: {
    marginTop: 20
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
