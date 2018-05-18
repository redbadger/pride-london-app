// @flow
import React from "react";
import { Platform, StyleSheet, TextInput } from "react-native";
import {
  lightNavyBlueColor,
  transparent,
  mediumGreyColor,
  eucalyptusGreenColor
} from "../../constants/colors";
import { scaleFont, scaleWithFont } from "../../components/Text";

type Props = {|
  placeholder: string,
  onFocus: () => void,
  onChangeText: string => void,
  returnKeyLabel?: string,
  returnKeyType?: "done" | "go" | "next" | "search" | "send",
  onSubmitEditing?: () => void,
  value: ?string
|};

type State = {|
  focused: boolean
|};

class DonateScreen extends React.PureComponent<Props, State> {
  state = { focused: false };

  onFocus = () => {
    this.setState({ focused: true });
    this.props.onFocus();
  };

  onBlur = () => {
    this.setState({ focused: false });
  };

  render() {
    const { placeholder, onFocus, ...otherProps } = this.props;
    const { focused } = this.state;
    return (
      <TextInput
        keyboardType="numeric"
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        placeholder={focused ? placeholder : null}
        placeholderTextColor={mediumGreyColor}
        style={[styles.base, focused && styles.focused]}
        underlineColorAndroid={transparent}
        {...otherProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  base: {
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
  focused: {
    borderColor: eucalyptusGreenColor
  }
});

export default DonateScreen;
