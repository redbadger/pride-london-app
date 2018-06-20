// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import paradeCoordinates from "../../constants/parade-coordinates";
import { velvetColor } from "../../constants/colors";
import Text, { scaleWithFont } from "../../components/Text";
import LocationCard from "./LocationCard";

const renderMap = () => (
  <MapView
    style={StyleSheet.absoluteFill}
    initialRegion={{
      latitude: 51.5085,
      longitude: -0.134192,
      latitudeDelta: 0.02,
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
);

type Props = {
  isFocused: boolean
};

const ParadeMapScreen = ({ isFocused }: Props) => (
  <View style={styles.container} testID="parade-map-screen">
    {isFocused ? renderMap() : null}
    <LocationCard />
  </View>
);

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

export default ParadeMapScreen;
