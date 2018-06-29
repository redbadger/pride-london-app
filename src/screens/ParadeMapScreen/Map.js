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
import { getCurrentPosition } from "../../lib/position";
import type {
  Coordinates,
  Region,
  Terminals
} from "../../constants/parade-coordinates";

import locationButtonInactive from "../../../assets/images/location-inactive.png";
import locationButtonActive from "../../../assets/images/location-active.png";

type PermissionStatus =
  | "authorized"
  | "denied"
  | "restricted"
  | "undetermined"
  | "checking"
  | "asking";

const shouldNeverAsk = (status: PermissionStatus) => status === "restricted";

type Props = {
  route: Array<Coordinates>,
  paradeRegion: Region,
  terminals: Array<Terminals>
};

type State = {
  locationPermission: PermissionStatus,
  atUserLocation: boolean
};

type setStateArguments = {
  locationPermission?: PermissionStatus,
  atUserLocation?: boolean
};

export const checkLocationPermission = (
  setState: setStateArguments => void
): Promise<PermissionStatus> => {
  setState({ locationPermission: "checking" });
  return Permissions.check("location").then(response => {
    setState({ locationPermission: response });
    return response;
  });
};

export const requestLocationPermission = (
  setState: setStateArguments => void,
  state: State
): Promise<PermissionStatus> => {
  if (shouldNeverAsk(state.locationPermission))
    return Promise.resolve(state.locationPermission);
  setState({ locationPermission: "asking" });
  return Permissions.request("location").then(response => {
    setState({ locationPermission: response });
    return response;
  });
};

const withHighAccuracy = {
  enableHighAccuracy: true,
  timeout: 3000,
  maximumAge: 10000
};

const withLowAccuracy = {
  enableHighAccuracy: false,
  timeout: 3000,
  maximumAge: 10000
};

const animateToCoordinate = ref => (coords: Coordinates) => {
  const { latitude, longitude } = coords;
  ref.current.animateToCoordinate({ latitude, longitude }, 500);
};

class Map extends Component<Props, State> {
  state = {
    locationPermission: "undetermined",
    atUserLocation: false
  };

  componentDidMount() {
    checkLocationPermission(this.setState.bind(this));
  }

  onRegionChange = (position: Coordinates) => {
    if (this.state.atUserLocation) {
      this.setState({ atUserLocation: false });
    } else if (this.state.locationPermission === "authorized") {
      getCurrentPosition(withHighAccuracy).then(
        this.checkAtUserLocation(position)
      );
    }
  };

  checkAtUserLocation = (mapCoordinate: Coordinates) => (
    coords: Coordinates
  ) => {
    const { latitude, longitude } = coords;
    if (
      mapCoordinate.latitude.toFixed(5) === latitude.toFixed(5) &&
      mapCoordinate.longitude.toFixed(5) === longitude.toFixed(5)
    )
      this.setState({ atUserLocation: true });
  };

  moveToCurrentLocation = (): Promise<void> =>
    requestLocationPermission(this.setState.bind(this), this.state).then(() => {
      if (this.state.locationPermission === "authorized") {
        return getCurrentPosition(withHighAccuracy)
          .catch(() => getCurrentPosition(withLowAccuracy))
          .then(animateToCoordinate(this.mapViewRef))
          .catch(() => {
            Alert.alert(
              "We couldn't find your location",
              "GPS or other location finding magic might not be available, please try again later"
            );
          });
      } else if (
        Platform.OS === "ios" &&
        this.state.locationPermission === "denied"
      ) {
        Linking.openURL("app-settings:");
      }
      return Promise.resolve();
    });

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
          showsPointsOfInterest={false}
          showsScale={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
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
        {!shouldNeverAsk(this.state.locationPermission) && (
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
    marginTop: Platform.OS === "ios" ? 44 : 8,
    paddingRight: Platform.OS === "ios" ? 0 : 8,
    paddingLeft: 10,
    paddingBottom: 10
  },
  image: {
    width: 48,
    height: 48
  }
});

export default Map;
