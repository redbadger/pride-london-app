// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import { formatTime } from "../data/formatters";

import Text from "./Text";

type Props = {
  title: string,
  startTime: string
};

const Performance = ({ title, startTime }: Props) => (
  <View style={styles.content}>
    <Text style={styles.startTime}>{formatTime(startTime)}</Text>
    <Text numberOfLines={3} style={styles.title}>
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    paddingVertical: 12
  },
  startTime: {
    width: 90,
    fontWeight: "bold"
  },
  title: { flex: 1 }
});

export default Performance;
