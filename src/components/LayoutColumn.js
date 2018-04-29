// @flow
import React from "react";
import type { Node } from "react";
import { StyleSheet, View } from "react-native";

type Props = { spacing: number, children: Node };

const LayoutColumn = ({ spacing, children }: Props) => (
  <View style={[{ marginVertical: -0.5 * spacing }, styles.column]}>
    {React.Children.map(children, child => {
      if (child === null) {
        return child;
      }
      return <View style={{ marginVertical: 0.5 * spacing }}>{child}</View>;
    })}
  </View>
);

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

export default LayoutColumn;
