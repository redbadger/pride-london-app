// @flow
import { showLocation } from "react-native-map-link";
import openMapLink from "./openMapLink.ios";

it("opens the default Android map intent", async () => {
  await openMapLink(51.5245918, -0.0881783, "Red Badger");

  expect(showLocation).toHaveBeenCalledWith({
    latitude: 51.5245918,
    longitude: -0.0881783,
    title: "Red Badger"
  });
});

afterEach(() => {
  showLocation.mockRestore();
});
