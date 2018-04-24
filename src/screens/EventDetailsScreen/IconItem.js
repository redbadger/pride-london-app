// @flow
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import type { Node } from "react";
import Touchable from "../../components/Touchable";

type IconItemProps = {|
  children: Node,
  onPress?: Function,
  source: Image.propTypes.source
|};

const IconItem = ({ children, onPress, source }: IconItemProps) => {
  if (onPress) {
    return (
      <View style={styles.container}>
        <Image source={source} style={styles.icon} />
        <Touchable onPress={onPress} style={styles.item}>
          {children}
        </Touchable>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.icon} />
      <View style={styles.item}>{children}</View>
    </View>
  );
};

IconItem.defaultProps = {
  onPress: undefined
};

// Note: minHeight, margin and paddings are to accomodate touchables. This
// component is designed to work as children of IconList which removes
// the outside margins.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    minHeight: 44
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 20,
    marginVertical: 6
  },
  item: {
    flexShrink: 1,
    justifyContent: "center",
    paddingVertical: 6
  }
});

export default IconItem;
