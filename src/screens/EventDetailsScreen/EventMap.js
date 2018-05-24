// @flow
import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import openMapLink from "./openMapLink";
import Touchable from "../../components/Touchable";
import Delayed from "../../components/Delayed";

type Props = {
  lat: number,
  lon: number,
  locationName: string
};

const EventMap = ({ lat, lon, locationName }: Props) => (
  <Touchable
    style={styles.mapWrapper}
    onPress={() => openMapLink(lat, lon, locationName)}
  >
    <Delayed delay={600}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        loadingEnabled
        cacheEnabled
      >
        <Marker
          coordinate={{
            latitude: lat,
            longitude: lon
          }}
        />
      </MapView>
    </Delayed>
  </Touchable>
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
