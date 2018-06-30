// @flow
import React from "react";
import { Marker } from "react-native-maps";
import type { Amenity } from "../../data/amenity";
import amenityIconFirstAid from "../../../assets/images/amenityIconFirstAid.png";
import amenityIconToilet from "../../../assets/images/amenityIconToilet.png";

type Props = {
  amenities: Amenity[]
};

const iconMap = {
  Toilet: amenityIconToilet,
  "First Aid": amenityIconFirstAid
};

const AmenityMarkers = ({ amenities }: Props) => {
  if (amenities.length === 0) {
    return null;
  }

  return amenities.map(amenity => (
    <Marker
      pointerEvents="none"
      coordinate={{
        longitude: amenity.fields.location.lon,
        latitude: amenity.fields.location.lat
      }}
      key={amenity.id}
      image={iconMap[amenity.fields.type]}
    />
  ));
};

export default AmenityMarkers;
