// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import { route, region, terminals } from "../../constants/parade-coordinates";
import LocationCard from "./LocationCard";
import Map from "./Map";

type Props = {
  isFocused: boolean
};

const ParadeMapScreen = ({ isFocused }: Props) => (
  <View style={styles.container} testID="parade-map-screen">
    {isFocused ? (
      <Map route={route} paradeRegion={region} terminals={terminals} />
    ) : null}
    <LocationCard />
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    justifyContent: "flex-end"
  }
});

export default ParadeMapScreen;
