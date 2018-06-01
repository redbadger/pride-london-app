import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";

import paradeCoordinates from "../../constants/parade-coordinates";

type Props = {};

type State = {};

export default class ParadeMap extends Component<Props, State> {
  render() {
    return (
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: 51.51004,
          longitude: -0.134192,
          latitudeDelta: 0.0225,
          longitudeDelta: 0.0041
        }}
      >
        <Polyline
          coordinates={paradeCoordinates}
          strokeWidth={5}
          strokeColor={"purple"}
          lineJoin={"bevel"}
        />
        <Marker coordinate={{ longitude: -0.14223, latitude: 51.51616 }}>
          <View
            style={{
              height: 15,
              width: 15,
              backgroundColor: "purple",
              borderRadius: 7,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.markerText}>A</Text>
          </View>
        </Marker>
        <Marker coordinate={{ longitude: -0.1265, latitude: 51.50499 }}>
          <View
            style={{
              height: 15,
              width: 15,
              backgroundColor: "purple",
              borderRadius: 7,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.markerText}>B</Text>
          </View>
        </Marker>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: Dimensions.get("window").height - 70
  },
  markerText: {
    color: "white",
    fontSize: 12
  }
});
