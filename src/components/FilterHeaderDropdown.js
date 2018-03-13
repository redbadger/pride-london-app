// @flow
import React from "react";
import type { Node } from "react";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import FilterHeaderButton from "./FilterHeaderButton";
import showPopupMenu from "./showPopupMenu";

type Props = {
  options: string[],
  onChange: Function,
  value: string,
  style?: StyleObj
};

class FilterHeaderDropdown extends React.PureComponent<Props> {
  static defaultProps = {
    style: {}
  };

  onRef = (button: Node) => {
    this.buttonRef = button;
  };

  buttonRef: Node = null;

  openPicker = async () => {
    const result = await showPopupMenu(this.props.options, this.buttonRef);
    if (result) {
      this.props.onChange(result);
    }
  };

  render() {
    return (
      <FilterHeaderButton
        text={`${this.props.value} ▾`}
        onPress={this.openPicker}
        style={this.props.style}
        onRef={this.onRef}
      />
    );
  }
}

export default FilterHeaderDropdown;
