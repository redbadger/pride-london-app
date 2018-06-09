import React from "react";
import { shallow } from "enzyme";
import { Alert } from "react-native";
import VersionCheck from "react-native-version-check";
import StoreVersionDialog from "./StoreVersionDialog";
import * as storage from "../integrations/storage";
import * as date from "../lib/date";

const nextTick = () => new Promise(resolve => setTimeout(resolve, 0));

beforeEach(() => {
  jest.resetAllMocks();
});

it("checks if new version available", async () => {
  jest
    .spyOn(VersionCheck, "needUpdate")
    .mockImplementation(() => ({ isNeeded: false }));
  jest
    .spyOn(storage, "getAppUpdateAskLaterTime")
    .mockImplementation(() => null);
  jest.spyOn(Alert, "alert");

  shallow(<StoreVersionDialog />);

  await nextTick();

  expect(VersionCheck.needUpdate).toHaveBeenCalled();
  expect(Alert.alert).not.toHaveBeenCalled();
});

it("alerts user if new version available", async () => {
  jest
    .spyOn(VersionCheck, "needUpdate")
    .mockImplementation(() => ({ isNeeded: true }));
  jest
    .spyOn(storage, "getAppUpdateAskLaterTime")
    .mockImplementation(() => null);
  jest.spyOn(Alert, "alert");

  shallow(<StoreVersionDialog />);

  await nextTick();

  expect(VersionCheck.needUpdate).toHaveBeenCalled();
  expect(Alert.alert).toHaveBeenCalled();
});

it("stores ask later time for beginning of next day", async () => {
  jest.spyOn(date, "now").mockImplementation(() => "2018-06-09T13:00Z");
  jest.spyOn(storage, "setAppUpdateAskLaterTime").mockImplementation(() => {});

  const output = shallow(<StoreVersionDialog />);

  output.instance().handleAskLater();

  expect(storage.setAppUpdateAskLaterTime).toHaveBeenCalledWith(
    "2018-06-10T00:00Z"
  );
});

it("does not show dialog if current time is before stored ask later time", async () => {
  jest
    .spyOn(VersionCheck, "needUpdate")
    .mockImplementation(() => ({ isNeeded: true }));
  jest.spyOn(date, "now").mockImplementation(() => "2018-06-09T13:00Z");
  jest
    .spyOn(storage, "getAppUpdateAskLaterTime")
    .mockImplementation(() => "2018-06-10T00:00Z");
  jest.spyOn(Alert, "alert");

  shallow(<StoreVersionDialog />);

  await nextTick();

  expect(Alert.alert).not.toHaveBeenCalled();
});

it("shows dialog if current time is after stored ask later time", async () => {
  jest
    .spyOn(VersionCheck, "needUpdate")
    .mockImplementation(() => ({ isNeeded: true }));
  jest.spyOn(date, "now").mockImplementation(() => "2018-06-10T13:00Z");
  jest
    .spyOn(storage, "getAppUpdateAskLaterTime")
    .mockImplementation(() => "2018-06-10T00:00Z");
  jest.spyOn(Alert, "alert");

  shallow(<StoreVersionDialog />);

  await nextTick();

  expect(Alert.alert).toHaveBeenCalled();
});
