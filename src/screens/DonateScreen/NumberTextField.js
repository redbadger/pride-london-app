// @flow
import React from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Text, { scaleFont, scaleWithFont } from "../../components/Text";
import {
  lightNavyBlueColor,
  transparent,
  mediumGreyColor,
  eucalyptusGreenColor
} from "../../constants/colors";
import getAccessibiltyLabel from "./accessibilityLabel";

type Props = {|
  label: string,
  placeholder: string,
  onFocus: () => void,
  onChangeText: string => void,
  returnKeyLabel?: string,
  returnKeyType?: "done" | "go" | "next" | "search" | "send",
  onSubmitEditing?: () => void,
  style?: ViewStyleProp,
  value: ?string
|};

type State = {|
  focused: boolean,
  selection: ?{ start: number, end: number }
|};

class DonateScreen extends React.PureComponent<Props, State> {
  static defaultProps = {
    returnKeyLabel: undefined,
    returnKeyType: undefined,
    onSubmitEditing: undefined,
    style: {}
  };

  state = {
    focused: false,
    selection: undefined
  };

  onFocus = () => {
    this.setState({ focused: true });
    this.props.onFocus();
  };

  onBlur = () => {
    this.setState({ focused: false });
  };

  onSelectionChange = (e: {
    nativeEvent: { selection: { start: number, end: number }, target: number }
  }) => {
    this.setState({ selection: e.nativeEvent.selection });
  };

  render() {
    const { label, placeholder, onFocus, style, ...otherProps } = this.props;
    const { focused, selection } = this.state;

    // Note on accessibility:
    // React Native does not support to mark up labels for input fields
    // properly. See for example: https://github.com/facebook/react-native/issues/14989
    // This is why we use a custom `accessibilityLabel`, which tries to mimic,
    // TalkBack/VoiceOver behaviour.

    return (
      <View
        accessible
        accessibilityLabel={getAccessibiltyLabel(
          label,
          placeholder,
          otherProps.value,
          focused,
          selection
        )}
        style={style}
      >
        <Text
          type="h4"
          color="lightNavyBlueColor"
          importantForAccessibility="no"
          style={styles.label}
        >
          {label}
        </Text>
        <TextInput
          keyboardType="numeric"
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onSelectionChange={this.onSelectionChange}
          placeholder={focused ? placeholder : null}
          placeholderTextColor={mediumGreyColor}
          style={[styles.input, focused && styles.inputFocused]}
          underlineColorAndroid={transparent}
          importantForAccessibility="no"
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8
  },
  input: {
    borderColor: mediumGreyColor,
    borderWidth: 1,
    borderRadius: 4,
    height: scaleWithFont("h2", 50),
    paddingHorizontal: 14,
    fontFamily: "Poppins-SemiBold",
    fontSize: scaleFont("h2", 18),
    color: lightNavyBlueColor,
    ...Platform.select({
      android: {
        lineHeight: scaleFont("h2", 18),
        includeFontPadding: false,
        textAlignVertical: "bottom"
      }
    })
  },
  inputFocused: {
    borderColor: eucalyptusGreenColor
  }
});

export default DonateScreen;
