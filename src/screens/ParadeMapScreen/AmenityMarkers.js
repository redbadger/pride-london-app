// @flow
import React, { Fragment } from "react";
import { Marker } from "react-native-maps";
import type { Amenity } from "../../data/amenity";
import type { Coordinates } from "../../constants/parade-coordinates";
import amenityIconFirstAid from "../../../assets/images/amenityIconFirstAid.png";
import amenityIconToilet from "../../../assets/images/amenityIconToilet.png";

type Props = {
  amenities: Amenity[],
  markerSelect: (event: { nativeEvent: { coordinate: Coordinates } }) => void
};

const iconMap = {
  Toilet: amenityIconToilet,
  "First Aid": amenityIconFirstAid
};

const AmenityMarkers = ({ amenities, markerSelect }: Props) => {
  if (amenities.length === 0) {
    return null;
  }

  return (
    <Fragment>
      {amenities.map(amenity => (
        <Marker
          pointerEvents="none"
          coordinate={{
            longitude: amenity.fields.location.lon,
            latitude: amenity.fields.location.lat
          }}
          key={amenity.id}
          image={iconMap[amenity.fields.type]}
          onSelect={markerSelect}
        />
      ))}
    </Fragment>
  );
};

export default AmenityMarkers;
