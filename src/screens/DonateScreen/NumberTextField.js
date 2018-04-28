// @flow
import React from "react";
import { PixelRatio, StyleSheet, TextInput } from "react-native";
import {
  lightNavyBlueColor,
  transparent,
  inputFieldBorderColor,
  inputFieldPlaceholderColor,
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
        placeholderTextColor={inputFieldPlaceholderColor}
        style={[styles.base, focused && styles.focused]}
        underlineColorAndroid={transparent}
        value={value}
      />
    );
  }
}

const styles = StyleSheet.create({
  base: {
    borderColor: inputFieldBorderColor,
    borderWidth: 1,
    borderRadius: 4,
    height: 50 * PixelRatio.getFontScale(),
    paddingHorizontal: 14,
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: lightNavyBlueColor
  },
  focused: {
    borderColor: eucalyptusGreenColor
  }
});

export default DonateScreen;
