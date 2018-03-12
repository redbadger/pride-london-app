// @flow
import { ActionSheetIOS } from "react-native"; // eslint-disable-line react-native/split-platform-components
import showPopupMenu from "./showPopupMenu.ios";

jest.mock("react-native", () => ({
  ActionSheetIOS: {
    showActionSheetWithOptions: jest.fn()
  }
}));

const UntypedActionSheetIOS: any = ActionSheetIOS;
const options = ["Apple", "Bananas", "Kiwi"];

it("opens a popup menu using ActionSheetIOS", async () => {
  const promise = showPopupMenu(options);
  expect(UntypedActionSheetIOS.showActionSheetWithOptions).toHaveBeenCalledWith(
    {
      options: [...options, "Cancel"],
      cancelButtonIndex: options.length
    },
    expect.any(Function)
  );

  const callback =
    UntypedActionSheetIOS.showActionSheetWithOptions.mock.calls[0][1];
  callback(1);

  await expect(promise).resolves.toBe("Bananas");
});

it("opens a popup menu using UIManager (popup dismissed)", async () => {
  const promise = showPopupMenu(options);
  const callback =
    UntypedActionSheetIOS.showActionSheetWithOptions.mock.calls[0][1];
  callback(options.length);

  await expect(promise).resolves.toBeUndefined();
});

afterEach(() => {
  UntypedActionSheetIOS.showActionSheetWithOptions.mockClear();
});
