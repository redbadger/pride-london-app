// @flow
import React from "react";
import { StyleSheet } from "react-native";
import CheckBox from "./CheckBox";
import Dialog from "./Dialog";

type Props = {
  applyButtonText: string,
  onApply: () => void,
  onCancel: () => void,
  onChange: (number[]) => void,
  options: string[],
  selectedIndexes: number[],
  title: string,
  visible: boolean
};

class MultiSelectDialog extends React.PureComponent<Props> {
  toggleCheckbox = (index: number) => {
    const newSelection = this.props.selectedIndexes.includes(index)
      ? this.props.selectedIndexes.filter(i => i !== index)
      : [...this.props.selectedIndexes, index];

    this.props.onChange(newSelection);
  };

  render() {
    return (
      <Dialog
        applyButtonText={this.props.applyButtonText}
        onApply={this.props.onApply}
        onCancel={this.props.onCancel}
        title={this.props.title}
        visible={this.props.visible}
      >
        {this.props.options.map((option, index) => (
          <CheckBox
            key={option}
            onChange={() => this.toggleCheckbox(index)}
            checked={this.props.selectedIndexes.includes(index)}
            label={option}
            style={styles.checkBox}
          />
        ))}
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  checkBox: {
    height: 48,
    paddingHorizontal: 16
  }
});

export default MultiSelectDialog;
