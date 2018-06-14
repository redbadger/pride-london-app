// @flow
import React, { Component, PureComponent } from "react";
import { Image, View, StyleSheet } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import Text, { scaleWithFont } from "../../components/Text";
import Touchable from "../../components/Touchable";
import { velvetColor } from "../../constants/colors";

import locationButtonInactive from "../../../assets/images/location-inactive.png";
import locationButtonActive from "../../../assets/images/location-active.png";

type Props = {
  route: any,
  paradeRegion: any,
  terminals: any,
  permission: boolean
};

type State = {
  atUserLocation: boolean
};

class Map extends PureComponent<Props> {
  constructor() {
    super();

    this.state = {
      atUserLocation: false
    };
  }

  focus(region) {
    this.mapView.animateToRegion(region, 0);
  }

  moveToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      this.mapView.animateToCoordinate(
        {
          latitude,
          longitude
        },
        500
      );
    });
  };

  onRegionChange = position => {
    const { latitude: currentLat, longitude: currentLong } = position;
    if (this.state.atUserLocation === true)
      return this.setState({ atUserLocation: false });

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude: userLat, longitude: userLong } = coords;
      if (
        userLat.toFixed(5) === currentLat.toFixed(5) &&
        userLong.toFixed(5) === currentLong.toFixed(5)
      ) {
        this.setState({ atUserLocation: true });
      }
    });
  };

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={this.props.paradeRegion}
          showsUserLocation={this.props.permission}
          onRegionChange={this.onRegionChange}
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
        {this.props.permission && (
          <Touchable
            onPress={this.moveToCurrentLocation}
            style={{ alignSelf: "flex-end", marginTop: 44 }}
          >
            <Image
              source={
                this.state.atUserLocation
                  ? locationButtonActive
                  : locationButtonInactive
              }
              style={{ width: 44, height: 44 }}
            />
          </Touchable>
        )}
      </View>
    );
  }
}

export default Map;
