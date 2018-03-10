// @flow
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import showLocation from "./openMapLink";

type Props = {
  lat: number,
  lon: number,
  locationName: string
};

const EventMap = ({ lat, lon, locationName }: Props) => (
  <TouchableOpacity
    style={styles.mapWrapper}
    onPress={() => showLocation(lat, lon, locationName)}
  >
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008
      }}
      scrollEnabled={false}
      zoomEnabled={false}
      loadingEnabled
    >
      <Marker
        coordinate={{
          latitude: lat,
          longitude: lon
        }}
      />
    </MapView>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mapWrapper: {
    borderRadius: 6,
    overflow: "hidden"
  },
  map: {
    height: 160
  }
});

export default EventMap;
