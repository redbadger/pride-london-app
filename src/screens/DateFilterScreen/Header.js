// @flow
import React from "react";
import { View } from "react-native";
import CommonHeader from "../../components/Header";
import ActionButton from "../../components/ActionButton";

type Props = {
  onBack: () => void,
  onCancel: () => void
};

const Header = ({ onBack, onCancel }: Props) => (
  <View>
    <CommonHeader
      leftElement={<CommonHeader.BackButton onPress={onBack} />}
      rightElement={<ActionButton label="Reset" onPress={onCancel} />}
    />
  </View>
);

export default Header;
