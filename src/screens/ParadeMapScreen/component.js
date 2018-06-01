import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Polyline } from "react-native-maps";

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
          latitude: 51.525493,
          longitude: -0.0822173,
          latitudeDelta: 0.0052,
          longitudeDelta: 0.0041
        }}
      >
        <Polyline
          coordinates={[
            { latitude: 51.5260317, longitude: -0.084559 },
            { latitude: 51.5254107, longitude: -0.083363 },
            { latitude: 51.5256209, longitude: -0.0818449 }
          ]}
          strokeWidth={8}
          strokeColor={"purple"}
          lineJoin={"bevel"}
        />
      </MapView>
    );
  }
}
