// @flow
import React from "react";
import { Picker, View, StyleSheet } from "react-native";

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

  selectValue = (newValue: string) => {
    this.setState({ picked: newValue });
  };

  render() {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          mode="dropdown"
          style={styles.filter}
          selectedValue={this.state.picked}
          onValueChange={this.selectValue}
        >
          {this.props.options.map(option => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
    );
  }
}

const filterBorderColor = "#FFF";
const filterColor = "#FFF";

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: filterBorderColor,
    borderRadius: 4,
    marginRight: 8
  },
  filter: {
    height: 32,
    width: 130,
    color: filterColor
  }
});

export default FilterDropdown;
