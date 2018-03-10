// @flow
import { Linking } from "react-native";

/**
 * Opens the default map intent as documented here:
 * https://developer.android.com/guide/components/intents-common.html#Maps
 */
export default async (lat: number, lng: number, label: string) => {
  await Linking.openURL(
    `geo:0,0?q=${lat},${lng}(${encodeURIComponent(label)})`
  );
};
