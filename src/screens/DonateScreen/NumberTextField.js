// @flow
import React from "react";
import { PixelRatio, Platform, StyleSheet, TextInput } from "react-native";
import {
  lightNavyBlueColor,
  transparent,
  mediumGreyColor,
  eucalyptusGreenColor
} from "../../constants/colors";

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
        allowFontScaling={false}
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

const cap = (def, max) => Math.min(max, def * PixelRatio.getFontScale());

const styles = StyleSheet.create({
  base: {
    borderColor: mediumGreyColor,
    borderWidth: 1,
    borderRadius: 4,
    height: 50 * Math.min(1.22, PixelRatio.getFontScale()),
    paddingHorizontal: 14,
    fontFamily: "Poppins-SemiBold",
    fontSize: cap(18, 22),
    color: lightNavyBlueColor,
    ...Platform.select({
      android: {
        lineHeight: cap(18, 22),
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
