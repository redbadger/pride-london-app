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
    const { placeholder, onChangeText, value } = this.props;
    const { focused } = this.state;
    return (
      <TextInput
        keyboardType="numeric"
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onChangeText={onChangeText}
        placeholder={focused ? placeholder : null}
        placeholderTextColor={mediumGreyColor}
        style={[styles.base, focused && styles.focused]}
        underlineColorAndroid={transparent}
        value={value}
      />
    );
  }
}

const styles = StyleSheet.create({
  base: {
    borderColor: mediumGreyColor,
    borderWidth: 1,
    borderRadius: 4,
    height: 50 * PixelRatio.getFontScale(),
    paddingHorizontal: 14,
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: lightNavyBlueColor,
    ...Platform.select({
      android: {
        lineHeight: 18,
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
