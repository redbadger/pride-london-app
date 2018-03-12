// @flow
import type { Node } from "react";
import { UIManager, findNodeHandle } from "react-native";
import showPopupMenu from "./showPopupMenu.android";

jest.mock("react-native", () => ({
  findNodeHandle: jest.fn(() => 42),
  UIManager: {
    showPopupMenu: jest.fn()
  }
}));

const options = ["Apple", "Bananas", "Kiwi"];
const view = (({}: any): Node);

it("opens a popup menu using UIManager", async () => {
  const promise = showPopupMenu(options, view);
  expect(findNodeHandle).toHaveBeenCalledWith(view);
  expect(UIManager.showPopupMenu).toHaveBeenCalledWith(
    expect.any(Number),
    options,
    expect.any(Function),
    expect.any(Function)
  );

  const onSuccess = UIManager.showPopupMenu.mock.calls[0][3];
  onSuccess("itemSelected", 1);

  await expect(promise).resolves.toBe("Bananas");
});

it("opens a popup menu using UIManager (popup dismissed)", async () => {
  const promise = showPopupMenu(options, view);
  const onSuccess = UIManager.showPopupMenu.mock.calls[0][3];
  onSuccess("dismissed");

  await expect(promise).resolves.toBeUndefined();
});

it("opens a popup menu using UIManager (error)", async () => {
  const promise = showPopupMenu(options, view);
  const onError = UIManager.showPopupMenu.mock.calls[0][2];
  const error = "oh noooo";
  onError(error);

  await expect(promise).rejects.toBe(error);
});

afterEach(() => {
  findNodeHandle.mockClear();
  UIManager.showPopupMenu.mockClear();
});
