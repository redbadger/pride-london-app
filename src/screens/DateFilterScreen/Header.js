// @flow
import React from "react";
import { View } from "react-native";
import CommonHeader from "../../components/Header";
import ActionButton from "../../components/ActionButton";

type Props = {
  onCancel: () => void,
  onReset: () => void,
  dateRange: string,
  title: string,
  titleLabel: string
};

const Header = ({ onCancel, onReset, dateRange, title, titleLabel }: Props) => (
  <View>
    <CommonHeader
      leftElement={<CommonHeader.BackButton onPress={onCancel} />}
      title={title}
      titleLabel={titleLabel}
      titleAccesible
      titleAccessibilityTraits={["header"]}
      titleAccessibilityLiveRegion="polite"
      rightElement={
        dateRange && <ActionButton label="Reset" onPress={onReset} />
      }
    />
  </View>
);

export default Header;
