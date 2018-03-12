// @flow
import React from "react";
import type { Node } from "react";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import FilterHeaderButton from "./FilterHeaderButton";
import showPopupMenu from "./showPopupMenu";

type Props = {
  options: string[],
  style?: StyleObj
};

type State = {
  picked: string
};

class FilterDropdown extends React.PureComponent<Props, State> {
  static defaultProps = {
    style: {}
  };

  state = {
    picked: this.props.options[0]
  };

  onRef = (button: Node) => {
    this.buttonRef = button;
  };

  buttonRef: Node = null;

  openPicker = async () => {
    const result = await showPopupMenu(this.props.options, this.buttonRef);
    if (result) {
      this.setState({ picked: result });
    }
  };

  render() {
    return (
      <FilterHeaderButton
        text={`${this.state.picked} ▾`}
        onPress={this.openPicker}
        style={this.props.style}
        onRef={this.onRef}
      />
    );
  }
}

export default FilterDropdown;
