// @flow
import React, { Component, PureComponent } from "react";
import { Image, View, StyleSheet } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import Text, { scaleWithFont } from "../../components/Text";
import Touchable from "../../components/Touchable";
import { velvetColor } from "../../constants/colors";

type Props = {
  route: any,
  region: any,
  terminals: any,
  permission: boolean
};

class Map extends PureComponent<Props> {
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={this.props.region}
          showsUserLocation={this.props.permission}
        >
          <Polyline
            coordinates={this.props.route}
            strokeWidth={5}
            strokeColor={velvetColor}
            lineJoin="bevel"
          />
          {this.props.terminals.map(terminal => {
            return (
              <Marker coordinate={terminal.coordinates} key={terminal.key}>
                <View style={terminal.style}>
                  <Text type={terminal.text.type} color={terminal.text.color}>
                    {terminal.text.text}
                  </Text>
                </View>
              </Marker>
            );
          })}
        </MapView>
      </View>
    );
  }
}

export default Map;
