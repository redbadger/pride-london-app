// @flow
import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import type { Amenity } from "../../data/amenity";
import type { Coordinates } from "../../constants/parade-coordinates";
import amenityIconFirstAid from "../../../assets/images/amenityIconFirstAid.png";
import amenityIconFirstAidActive from "../../../assets/images/amenityIconFirstAidActive.png";
import amenityIconToilet from "../../../assets/images/amenityIconToilet.png";
import amenityIconToiletActive from "../../../assets/images/amenityIconToiletActive.png";

type Props = {
  amenities: Amenity[],
  activeMarker: ?string,
  onMarkerPress: (amenity: Amenity) => void,
  onMarkerSelect: (event: { nativeEvent: { coordinate: Coordinates } }) => void
};

const iconMap = {
  Toilet: amenityIconToilet,
  "First Aid": amenityIconFirstAid
};

const activeIconMap = {
  Toilet: amenityIconToiletActive,
  "First Aid": amenityIconFirstAidActive
};

const AmenityMarkers = ({
  amenities,
  activeMarker,
  onMarkerPress,
  onMarkerSelect
}: Props) => {
  if (amenities.length === 0) {
    return null;
  }
  return (
    <Fragment>
      {amenities.map(amenity => (
        <Marker
          coordinate={{
            longitude: amenity.fields.location.lon,
            latitude: amenity.fields.location.lat
          }}
          stopPropagation
          key={amenity.id}
          style={activeMarker === amenity.id ? styles.active : styles.inactive}
          image={
            activeMarker === amenity.id
              ? activeIconMap[amenity.fields.type]
              : iconMap[amenity.fields.type]
          }
          onPress={() => onMarkerPress(amenity)}
          onSelect={onMarkerSelect}
        />
      ))}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  inactive: {
    zIndex: 1
  },
  active: {
    // React Native Maps adds a constant to the currently open callout, but if the stage marker is active we want to move it above this
    // https://github.com/react-community/react-native-maps/blob/080678b24f886c3b8104206f2f80452ee723243a/lib/ios/AirMaps/AIRMapMarker.m#L316
    zIndex: 1001
  }
});

export default AmenityMarkers;
