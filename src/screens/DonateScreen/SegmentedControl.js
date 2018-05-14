// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import Text, { scaleWithFont } from "../../components/Text";
import Touchable from "../../components/Touchable";
import { mediumGreyColor, eucalyptusGreenColor } from "../../constants/colors";

type Props = {|
  onValueChange: (value: any) => void,
  selectedValue: ?any,
  children: SegmentedControl.Item[]
|};

const SegmentedControl = ({
  onValueChange,
  selectedValue,
  children
}: Props) => {
  let selectedIndex = -1;
  const items = React.Children.map(children, (child, index) => {
    if (child.props.value === selectedValue) {
      selectedIndex = index;
    }

    return {
      label: child.props.label,
      value: child.props.value
    };
  });

  return (
    <View style={styles.container}>
      {items.map(({ label, value }, index) => (
        <Touchable
          key={value}
          accessibilityComponentType={
            index === selectedIndex
              ? "radiobutton_checked"
              : "radiobutton_unchecked"
          }
          accessibilityTraits={
            index === selectedIndex ? ["button", "selected"] : ["button"]
          }
          onPress={() => onValueChange(value)}
          style={[
            styles.button,
            index === selectedIndex && styles.buttonSelected,
            index === 0 && styles.buttonBorderStart,
            index === items.length - 1 && styles.buttonBorderEnd,
            index - 1 !== selectedIndex && styles.borderButtonLeft
          ]}
          testID={`button-${index}`}
        >
          <Text type="h2" color="lightNavyBlueColor" style={styles.buttonText}>
            {label}
          </Text>
        </Touchable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  button: {
    flexGrow: 1,
    borderColor: mediumGreyColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: scaleWithFont("h2", 50),
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSelected: {
    borderColor: eucalyptusGreenColor,
    backgroundColor: eucalyptusGreenColor
  },
  buttonBorderStart: {
    borderLeftWidth: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  buttonBorderEnd: {
    borderRightWidth: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  borderButtonLeft: {
    borderLeftWidth: 1
  },
  buttonText: {
    marginTop: 2
  }
});

type ItemProps = {|
  label: string,
  value: any
|};

SegmentedControl.Item = (props: ItemProps) => null; // eslint-disable-line no-unused-vars

export default SegmentedControl;
