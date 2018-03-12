// @flow
import type { Node } from "react";
import { UIManager, findNodeHandle } from "react-native";

export default function(options: string[], viewRef: Node): Promise<string> {
  return new Promise((resolve, reject) => {
    UIManager.showPopupMenu(
      findNodeHandle(viewRef),
      options,
      reject,
      (event: string, index: number) => {
        if (event === "itemSelected") {
          resolve(options[index]);
        } else {
          resolve();
        }
      }
    );
  });
}
