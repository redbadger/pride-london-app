// @flow
import React, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import Text from "../../components/Text";
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

class Map extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      atUserLocation: false
    };
  }

  onRegionChange = position => {
    const { latitude: currentLat, longitude: currentLong } = position;
    if (this.state.atUserLocation === true)
      return this.setState({ atUserLocation: false });

    return navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude: userLat, longitude: userLong } = coords;
      if (
        userLat.toFixed(5) === currentLat.toFixed(5) &&
        userLong.toFixed(5) === currentLong.toFixed(5)
      ) {
        this.setState({ atUserLocation: true });
      }
    });
  };

  focus = region => {
    this.mapView.animateToRegion(region, 0);
  };

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
          {this.props.terminals.map(terminal => (
            <Marker coordinate={terminal.coordinates} key={terminal.key}>
              <View style={terminal.style}>
                <Text type={terminal.text.type} color={terminal.text.color}>
                  {terminal.text.text}
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>
        {this.props.permission && (
          <Touchable
            onPress={this.moveToCurrentLocation}
            style={styles.touchable}
          >
            <Image
              source={
                this.state.atUserLocation
                  ? locationButtonActive
                  : locationButtonInactive
              }
              style={styles.image}
            />
          </Touchable>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    alignSelf: "flex-end",
    marginTop: 44
  },
  image: {
    width: 44,
    height: 44
  }
});

export default Map;
