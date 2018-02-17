// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

const HeatMap = () => (
  <View style={styles.container}>
    <MapView
      provider="google"
      style={styles.map}
      region={{
        latitude: 51.50931,
        longitude: -0.126947,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
export default HeatMap;
