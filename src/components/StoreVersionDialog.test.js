import React from "react";
import { shallow } from "enzyme";
import { Alert } from "react-native";
import VersionCheck from "react-native-version-check";
import StoreVersionDialog from "./StoreVersionDialog";

const wait = time => new Promise(resolve => setTimeout(resolve, time));

it("checks if new version available", async () => {
  jest
    .spyOn(VersionCheck, "needUpdate")
    .mockImplementation(() => ({ isNeeded: false }));
  jest.spyOn(Alert, "alert");

  shallow(<StoreVersionDialog />);

  await wait(0);

  expect(VersionCheck.needUpdate).toHaveBeenCalled();
  expect(Alert.alert).not.toHaveBeenCalled();
});

it("alerts user if new version available", async () => {
  jest
    .spyOn(VersionCheck, "needUpdate")
    .mockImplementation(() => ({ isNeeded: true }));
  jest.spyOn(Alert, "alert");

  shallow(<StoreVersionDialog />);

  await wait(0);

  expect(VersionCheck.needUpdate).toHaveBeenCalled();
  expect(Alert.alert).toHaveBeenCalled();
});
