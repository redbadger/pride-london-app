import { Linking } from "react-native";

export default async (lat, lng, label) => {
  await Linking.openURL(`geo:0,0?q=${lat},${lng}(${label})`);
};
