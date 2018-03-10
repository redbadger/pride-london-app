import { showLocation } from "react-native-map-link";

export default async (latitude, longitude, title) => {
  await showLocation({
    latitude,
    longitude,
    title
  });
};
