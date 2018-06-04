// @flow
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";

import paradeCoordinates from "../../constants/parade-coordinates";
import { velvetColor, whiteColor } from "../../constants/colors";

const ParadeMap = () => (
  <MapView
    style={StyleSheet.absoluteFill}
    scrollEnabled={false}
    region={{
      latitude: 51.51004,
      longitude: -0.134192,
      latitudeDelta: 0.02,
      longitudeDelta: 0.0112
    }}
  >
    <Polyline
      coordinates={paradeCoordinates}
      strokeWidth={5}
      strokeColor={velvetColor}
      lineJoin="bevel"
    />
    <Marker coordinate={{ longitude: -0.14223, latitude: 51.51616 }}>
      <View style={styles.markerView}>
        <Text style={styles.markerText}>A</Text>
      </View>
    </Marker>
    <Marker coordinate={{ longitude: -0.1265, latitude: 51.50499 }}>
      <View style={styles.markerView}>
        <Text style={styles.markerText}>B</Text>
      </View>
    </Marker>
  </MapView>
);

const styles = StyleSheet.create({
  markerView: {
    height: 15,
    width: 15,
    backgroundColor: velvetColor,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  markerText: {
    color: whiteColor,
    fontSize: 12
  }
});

export default ParadeMap;
