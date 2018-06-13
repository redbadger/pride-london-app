// @flow
import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import Permissions from "react-native-permissions";
import type {
  NavigationEventSubscription,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { route, region } from "../../constants/parade-coordinates";
import { velvetColor, whiteColor } from "../../constants/colors";
import Text, { scaleWithFont } from "../../components/Text";
import Touchable from "../../components/Touchable";
import LocationCard from "./LocationCard";

import locationButtonInactive from "../../../assets/images/location-inactive.png";
import locationButtonActive from "../../../assets/images/location-active.png";

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

class ParadeMapScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      locationPermission: false,
      atUserLocation: false
    };
  }

  componentDidMount() {
    this.checkPermission();
  }

  checkPermission = () => {
    Permissions.check("location").then(response => {
      if (response === "authorized")
        this.setState({ locationPermission: true });
      if (response === "denied" || response === "undetermined")
        this.requestPermission();
    });
  };

  requestPermission = () => {
    Permissions.request("location").then(response => {
      this.setState({ locationPermission: true });
    });
  };

  moveToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      this._map.animateToCoordinate(
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
      <View style={styles.container} testID="parade-map-screen">
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={region}
          showsUserLocation={this.state.locationPermission}
          ref={component => {
            this._map = component;
          }}
          onRegionChange={this.onRegionChange}
          key={this.props.navigation.isFocused()}
        >
          <Polyline
            coordinates={route}
            strokeWidth={5}
            strokeColor={velvetColor}
            lineJoin="bevel"
          />

          <Marker coordinate={{ longitude: -0.14223, latitude: 51.51616 }}>
            <View style={styles.markerView}>
              <Text type="xSmall" color="whiteColor">
                A
              </Text>
            </View>
          </Marker>
          <Marker coordinate={{ longitude: -0.1265, latitude: 51.50499 }}>
            <View style={styles.markerView}>
              <Text type="xSmall" color="whiteColor">
                B
              </Text>
            </View>
          </Marker>
        </MapView>
        {this.state.locationPermission && (
          <Touchable
            onPress={this.moveToCurrentLocation}
            style={{ alignSelf: "flex-end" }}
          >
            <Image
              source={
                this.state.atUserLocation
                  ? locationButtonActive
                  : locationButtonInactive
              }
            />
          </Touchable>
        )}
        {/* <LocationCard /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  markerView: {
    height: Math.max(15, scaleWithFont("xSmall", 18)),
    width: Math.max(15, scaleWithFont("xSmall", 18)),
    backgroundColor: velvetColor,
    borderRadius: Math.max(9, scaleWithFont("xSmall", 9)),
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ParadeMapScreen;
