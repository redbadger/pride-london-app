// @flow
import { showLocation } from "react-native-map-link";

/**
 * Asks the user to open the location in a few supported
 * apps (if installed).
 */
export default async (latitude: number, longitude: number, title: string) => {
  await showLocation({
    latitude,
    longitude,
    title
  });
};
