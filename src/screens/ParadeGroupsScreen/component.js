// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import ParadeGroupList from "./ParadeGroupList";
import type { ParadeGroup } from "./parade-group";
import { bgColor } from "../../constants/colors";

export const groupByName = (paradeGroups: ParadeGroup[]): ParadeGroup[][] => [
  paradeGroups
];

type Props = {
  paradeGroups: ParadeGroup[]
};

const ParadeGroupsScreen = (props: Props) => (
  <View style={styles.container} testID="parade-groups-screen">
    <ParadeGroupList paradeGroups={groupByName(props.paradeGroups)} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor
  }
});

export default ParadeGroupsScreen;
