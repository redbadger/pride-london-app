// @flow
import React from "react";
import { View } from "react-native";
import CommonHeader from "../../components/Header";
import ActionButton from "../../components/ActionButton";

type Props = {
  onCancel: () => void,
  onReset: () => void,
  dateRange: string
};

const Header = ({ onCancel, onReset, dateRange }: Props) => (
  <View>
    <CommonHeader
      leftElement={<CommonHeader.BackButton onPress={onCancel} />}
      rightElement={
        dateRange && <ActionButton label="Reset" onPress={onReset} />
      }
    />
  </View>
);

export default Header;
