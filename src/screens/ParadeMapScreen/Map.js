// @flow
import React, { Component } from "react";
import type { ElementRef } from "react";
import {
  Image,
  Platform,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking,
  Alert
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import Permissions from "react-native-permissions";
import Text from "../../components/Text";
import { velvetColor } from "../../constants/colors";
import type {
  Coordinates,
  Region,
  Terminals
} from "../../constants/parade-coordinates";

import locationButtonInactive from "../../../assets/images/location-inactive.png";
import locationButtonActive from "../../../assets/images/location-active.png";

type PermissionStatus = "authorized" | "denied" | "restricted" | "undetermined";
const neverAskStatuses = new Set(["restricted"]);

type Props = {
  route: Array<Coordinates>,
  paradeRegion: Region,
  terminals: Array<Terminals>
};

type State = {
  locationPermission: ?PermissionStatus,
  atUserLocation: boolean
};

class Map extends Component<Props, State> {
  state = {
    locationPermission: undefined,
    atUserLocation: false
  };

  componentDidMount() {
    this.locationPermissionPromise = Permissions.check("location");
    this.locationPermissionPromise.then(response => {
      this.setState({ locationPermission: response });
    });
  }

  onRegionChange = (position: Coordinates) => {
    const { latitude: currentLat, longitude: currentLong } = position;
    if (this.state.atUserLocation) {
      this.setState({ atUserLocation: false });
    } else if (this.state.locationPermission === "authorized") {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude: userLat, longitude: userLong } = coords;
        if (
          userLat.toFixed(5) === currentLat.toFixed(5) &&
          userLong.toFixed(5) === currentLong.toFixed(5)
        ) {
          this.setState({ atUserLocation: true });
        }
      });
    }
  };

  locationPermissionPromise: Promise<PermissionStatus>;

  focus = (region: Region) => {
    this.mapViewRef.current.animateToRegion(region, 0);
  };

  confirmLocationPermission = async (): Promise<PermissionStatus> => {
    let locationPermission = await this.locationPermissionPromise;
    if (
      locationPermission !== "authorized" &&
      !neverAskStatuses.has(this.state.locationPermission)
    ) {
      locationPermission = await Permissions.request("location");
      this.setState({ locationPermission });
    }

    return locationPermission;
  };

  moveToCurrentLocation = async () => {
    const locationPermission = await this.confirmLocationPermission();
    if (locationPermission === "authorized") {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          this.mapViewRef.current.animateToCoordinate(
            { latitude, longitude },
            500
          );
        },
        () => {
          navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
              const { latitude, longitude } = coords;
              this.mapViewRef.current.animateToCoordinate(
                { latitude, longitude },
                500
              );
            },
            () => {
              Alert.alert(
                "We couldn't find your location",
                "GPS or other location finding magic might not be available, please try again later"
              );
            },
            { enableHighAccuracy: false, timeout: 3000, maximumAge: 10000 }
          );
        },
        { enableHighAccuracy: true, timeout: 3000, maximumAge: 10000 }
      );
    } else if (Platform.OS === "ios" && locationPermission === "denied") {
      Linking.openURL("app-settings:");
    }
  };

  // $FlowFixMe
  mapViewRef: ElementRef<typeof MapView> = React.createRef();

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={this.props.paradeRegion}
          showsUserLocation={this.state.locationPermission === "authorized"}
          showsMyLocationButton={false}
          onRegionChange={this.onRegionChange}
          ref={this.mapViewRef}
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
        {!neverAskStatuses.has(this.state.locationPermission) && (
          <View style={styles.touchable}>
            <TouchableWithoutFeedback
              onPress={this.moveToCurrentLocation}
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
            >
              <View>
                <Image
                  accessibilityLabel="Show my location"
                  source={
                    this.state.atUserLocation
                      ? locationButtonActive
                      : locationButtonInactive
                  }
                  style={styles.image}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    alignSelf: "flex-end",
    paddingTop: Platform.OS === "ios" ? 44 : 8,
    paddingRight: Platform.OS === "ios" ? 0 : 8,
    paddingLeft: 10,
    paddingBottom: 10
  },
  image: {
    width: 44,
    height: 44
  }
});

export default Map;
