// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import R from "ramda";
import ParadeGroupList, { sectionTitle } from "./ParadeGroupList";
import type { ParadeGroup } from "../../data/parade-group";
import { bgColor } from "../../constants/colors";

const groupByName = R.groupWith(
  (a: ParadeGroup, b: ParadeGroup) => sectionTitle(a) === sectionTitle(b)
);

export const sortAndGroupByName: (ParadeGroup[]) => ParadeGroup[][] = R.memoize(
  R.compose(
    groupByName,
    R.sortBy(
      R.compose(
        R.toUpper,
        R.prop("name"),
        R.prop("fields")
      )
    )
  )
);

type Props = {
  paradeGroups: ParadeGroup[]
};

const ParadeGroupsScreen = (props: Props) => (
  <View style={styles.container} testID="parade-groups-screen">
    <ParadeGroupList paradeGroups={sortAndGroupByName(props.paradeGroups)} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor
  }
});

export default ParadeGroupsScreen;
