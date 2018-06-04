// @flow
import React from "react";
import { View } from "react-native";
import CommonHeader from "../../components/Header";
import ActionButton from "../../components/ActionButton";

type Props = {
  onBack: Function
};

const Header = ({ onBack }: Props) => (
  <View>
    <CommonHeader
      leftElement={<CommonHeader.BackButton onPress={onBack} />}
      rightElement={
        <ActionButton
          label="Reset"
          onPress={() => console.log("TODO: CLEAR ALL!")}
        />
      }
    />
  </View>
);

export default Header;
