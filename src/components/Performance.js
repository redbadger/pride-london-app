// @flow
import React from "react";
import { Text, View } from "react-native";

type Props = {
  title: string,
  startTime: string
};

const Performance = ({ title, startTime }: Props) => (
  <View>
    <Text>{startTime}</Text>
    <Text>{title}</Text>
  </View>
);

export default Performance;
