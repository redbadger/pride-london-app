// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import formatDate from "date-fns/format";

import Text from "./Text";
import { lightishGreyColor } from "../constants/colors";

const timeFormat = "h:mma";

type Props = {
  title: string,
  startTime: string
};

const Performance = ({ title, startTime }: Props) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.startTime}>{formatDate(startTime, timeFormat)}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: lightishGreyColor
  },
  startTime: {
    width: 90,
    fontWeight: "bold"
  },
  title: {}
});

export default Performance;
