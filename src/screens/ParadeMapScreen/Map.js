// @flow
import React, { Component } from "react";
import type { ElementRef } from "react";
import {
  Image,
  Platform,
  View,
  StyleSheet,
  TouchableNativeFeedback
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import Permissions from "react-native-permissions";
import Text from "../../components/Text";
import Touchable from "../../components/Touchable";
import { velvetColor } from "../../constants/colors";
import type {
  Coordinates,
  Region,
  Terminals
} from "../../constants/parade-coordinates";

import locationButtonInactive from "../../../assets/images/location-inactive.png";
import locationButtonActive from "../../../assets/images/location-active.png";

type PermissionStatus = "authorized" | "denied" | "restricted" | "undetermined";
const neverAskStatuses = Platform.select({
  android: new Set(["restricted"]),
  ios: new Set(["denied", "restricted"])
});

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
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        this.mapViewRef.current.animateToCoordinate(
          { latitude, longitude },
          500
        );
      });
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
          <Touchable
            onPress={this.moveToCurrentLocation}
            style={styles.touchable}
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          >
            <Image
              accessibilityLabel="Show my location"
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
    marginTop: Platform.OS === "ios" ? 44 : 8,
    marginRight: Platform.OS === "ios" ? 0 : 8
  },
  image: {
    width: 44,
    height: 44
  }
});

export default Map;
