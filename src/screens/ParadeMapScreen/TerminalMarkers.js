// @flow
import React, { Fragment } from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";
import Text from "../../components/Text";
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
          <View style={terminal.style.markerView}>
            <View style={terminal.style.markerTextWrapper}>
              <Text type={terminal.text.type} color={terminal.text.color}>
                {terminal.text.text}
              </Text>
            </View>
            <View style={terminal.style.triangle} />
          </View>
        </Marker>
      ))}
    </Fragment>
  );
};

export default TerminalMarkers;
