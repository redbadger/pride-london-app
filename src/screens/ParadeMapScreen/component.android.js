// @flow
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import Permissions from "react-native-permissions";
import paradeCoordinates from "../../constants/parade-coordinates";
import { velvetColor, whiteColor } from "../../constants/colors";
import Text, { scaleWithFont } from "../../components/Text";
import Touchable from "../../components/Touchable";
import LocationCard from "./LocationCard";

class ParadeMapScreen extends Component {
  constructor() {
    super();
    this.state = {
      locationPermission: false
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

  render() {
    return (
      <View style={styles.container} testID="parade-map-screen">
        <MapView
          // second style object to force re-render in order to display location button
          style={[
            StyleSheet.absoluteFillObject,
            this.state.locationPermission && styles.mapView
          ]}
          region={{
            latitude: 51.5085,
            longitude: -0.134192,
            latitudeDelta: 0.02,
            longitudeDelta: 0.000000041
          }}
          showsUserLocation={this.state.locationPermission}
          showsMyLocationButton={this.state.locationPermission}
        >
          <Polyline
            coordinates={paradeCoordinates}
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
        <LocationCard />
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
  mapView: {
    marginTop: -1
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
