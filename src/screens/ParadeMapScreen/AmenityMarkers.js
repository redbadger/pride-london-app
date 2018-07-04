// @flow
import React, { Fragment } from "react";
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
  handleMarkerPress: (markerID: string) => void,
  markerSelect: (event: { nativeEvent: { coordinate: Coordinates } }) => void
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
  handleMarkerPress,
  markerSelect
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
          onPress={() => handleMarkerPress(amenity.id)}
          key={amenity.id}
          image={
            activeMarker === amenity.id
              ? activeIconMap[amenity.fields.type]
              : iconMap[amenity.fields.type]
          }
          onSelect={markerSelect}
        />
      ))}
    </Fragment>
  );
};

export default AmenityMarkers;
