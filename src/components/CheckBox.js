// @flow
import React from "react";
import {
  findNodeHandle,
  Image,
  NativeModules,
  StyleSheet,
  TouchableOpacity as Touchable
} from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Text from "./Text";
// import Touchable from "./Touchable";

import checkboxUrl from "../../assets/images/checkBox.png";
import checkBoxCheckedUrl from "../../assets/images/checkBoxChecked.png";

const { SelectableHelper } = NativeModules;

type Props = {
  checked: boolean,
  label: string,
  onChange: Function,
  style?: ViewStyleProp
};

class CheckBox extends React.Component<Props> {
  static defaultProps = {
    style: {}
  };

  componentDidMount() {
    SelectableHelper.makeSelectable(findNodeHandle(this.touchableRef.current));
  }

  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.label !== nextProps.label ||
      this.props.checked !== nextProps.checked
    );
  }

  onPress = () => {
    this.props.onChange();
  };

  // $FlowFixMe
  touchableRef = React.createRef();

  render() {
    const { checked, label, style } = this.props;

    return (
      <Touchable
        accessibilityComponentType={
          checked ? "radiobutton_checked" : "radiobutton_unchecked"
        }
        accessibilityTraits={checked ? ["button", "selected"] : ["button"]}
        onPress={this.onPress}
        style={[styles.container, style]}
        ref={this.touchableRef}
      >
        <Text style={styles.text}>{label}</Text>
        <Image source={checked ? checkBoxCheckedUrl : checkboxUrl} />
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    // prevents text from pushing icon off screen
    flex: 1
  }
});

export default CheckBox;
