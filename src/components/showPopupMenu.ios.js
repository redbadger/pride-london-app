// @flow
import { ActionSheetIOS } from "react-native";

export default function(options: string[]): Promise<string> {
  const actionSheetOptions = [...options, "Cancel"];

  return new Promise(resolve => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actionSheetOptions,
        cancelButtonIndex: actionSheetOptions.length - 1
      },
      buttonIndex => {
        if (buttonIndex !== actionSheetOptions.length - 1) {
          resolve(actionSheetOptions[buttonIndex]);
        } else {
          resolve();
        }
      }
    );
  });
}
