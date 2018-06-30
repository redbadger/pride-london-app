// @flow
import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import Text, { scaleWithFont } from "../../components/Text";
import { lightNavyBlueColor, transparent } from "../../constants/colors";
import type { Terminals } from "../../constants/parade-coordinates";

type Props = {
  terminals: Terminals[]
};

const TerminalMarkers = ({ terminals }: Props) => {
  if (terminals.length === 0) {
    return null;
  }

  return (
    <Fragment>
      {terminals.map(terminal => (
        <Marker
          coordinate={terminal.coordinates}
          key={terminal.key}
          centerOffset={{ x: 0, y: -15 }}
          stopPropagation
        >
          <View style={styles.markerView}>
            <View style={styles.markerTextWrapper}>
              <Text type={terminal.text.type} color={terminal.text.color}>
                {terminal.text.text}
              </Text>
            </View>
            <View style={styles.triangle} />
          </View>
        </Marker>
      ))}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  markerView: {
    alignItems: "center",
    justifyContent: "center"
  },
  markerTextWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: lightNavyBlueColor,
    height: Math.max(30, scaleWithFont("h4", 30)),
    width: Math.max(60, scaleWithFont("h4", 60)),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: transparent,
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: transparent,
    borderRightColor: transparent,
    borderBottomColor: lightNavyBlueColor,
    transform: [{ rotate: "180deg" }]
  }
});

export default TerminalMarkers;
