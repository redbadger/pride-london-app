// @flow
import React from "react";
import { ActionSheetIOS, TouchableOpacity, StyleSheet } from "react-native";
import Text from "./Text";

type Props = {
  options: string[]
};

type State = {
  picked: string
};

class FilterDropdown extends React.PureComponent<Props, State> {
  state = {
    picked: this.props.options[0]
  };

  openPicker = () => {
    const options = [...this.props.options, "Cancel"];

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1
      },
      buttonIndex => {
        if (buttonIndex !== options.length - 1) {
          this.selectValue(options[buttonIndex]);
        }
      }
    );
  };

  selectValue = (newValue: string) => {
    this.setState({ picked: newValue });
  };

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.openPicker}>
        <Text type="text" style={styles.buttonText}>
          {this.state.picked} ▾
        </Text>
      </TouchableOpacity>
    );
  }
}

const filterBorderColor = "#FFF";
const filterColor = "#FFF";

const styles = StyleSheet.create({
  button: {
    height: 32,
    width: 100,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: filterBorderColor,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8
  },
  buttonText: {
    color: filterColor
  }
});

export default FilterDropdown;
