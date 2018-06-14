// @flow
import React, { Component, PureComponent } from "react";
import { View } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import Text, { scaleWithFont } from "../../components/Text";
import Touchable from "../../components/Touchable";
import { velvetColor } from "../../constants/colors";

type Props = {
  route: any,
  paradeRegion: any,
  terminals: any,
  permission: boolean
};

class Map extends PureComponent<Props> {
  focus(region) {
    this.mapView.animateToRegion(region, 0);
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={this.props.paradeRegion}
          showsUserLocation={this.props.permission}
          showsUserLocationButton={this.props.permission}
          ref={component => {
            this.mapView = component;
          }}
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
