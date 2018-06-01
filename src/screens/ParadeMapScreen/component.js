import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Polyline } from "react-native-maps";

import paradeCoordinates from "../../constants/parade-coordinates";

type Props = {};

type State = {};

export default class ParadeMap extends Component<Props, State> {
  render() {
    return (
      <MapView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: Dimensions.get("window").height - 70
        }}
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
      </MapView>
    );
  }
}
