// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import formatDate from "date-fns/format";

const timeFormat = "HH:mm";

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
    alignItems: "flex-start"
  },
  startTime: {
    width: 100,
    paddingLeft: 20
  },
  title: {}
});

export default Performance;
