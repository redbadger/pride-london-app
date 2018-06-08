// @flow
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import type { NavigationEventSubscription } from "react-navigation";

import paradeCoordinates from "../../constants/parade-coordinates";
import { velvetColor } from "../../constants/colors";
import Text, { scaleWithFont } from "../../components/Text";
import LocationCard from "./LocationCard";
import { withNavigationFocus } from "../../lib/navigation";
import type { NavigationProps } from "../../lib/navigation";

export class ParadeMap extends Component<NavigationProps> {
  constructor(props: NavigationProps) {
    super();
    this.focus = props.navigation.addListener("willFocus", () => null);
  }

  componentWillUnmount() {
    this.focus.remove();
  }

  focus: NavigationEventSubscription;

  render() {
    return (
      <View style={styles.container} testID="parade-map-screen">
        <MapView
          style={StyleSheet.absoluteFill}
          region={{
            latitude: 51.51004,
            longitude: -0.134192,
            latitudeDelta: 0.018,
            longitudeDelta: 0.000000041
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
              <Text type="xSmall" color="whiteColor">
                A
              </Text>
            </View>
          </Marker>
          <Marker coordinate={{ longitude: -0.1265, latitude: 51.50499 }}>
            <View style={styles.markerView}>
              <Text type="xSmall" color="whiteColor">
                B
              </Text>
            </View>
          </Marker>
        </MapView>
        <LocationCard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  markerView: {
    height: Math.max(15, scaleWithFont("xSmall", 18)),
    width: Math.max(15, scaleWithFont("xSmall", 18)),
    backgroundColor: velvetColor,
    borderRadius: Math.max(9, scaleWithFont("xSmall", 9)),
    justifyContent: "center",
    alignItems: "center"
  }
});

export default withNavigationFocus(ParadeMap);
