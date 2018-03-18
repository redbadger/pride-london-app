// @flow
import { Linking } from "react-native";
import openMapLink from "./openMapLink.android";

let openURLSpy;
beforeEach(() => {
  openURLSpy = jest
    .spyOn(Linking, "openURL")
    .mockImplementation(() => Promise.resolve());
});

it("opens the default Android map intent", async () => {
  await openMapLink(51.5245918, -0.0881783, "Red Badger");

  expect(openURLSpy).toHaveBeenCalledWith(
    "geo:0,0?q=51.5245918,-0.0881783(Red%20Badger)"
  );
});

afterEach(() => {
  openURLSpy.mockRestore();
});
