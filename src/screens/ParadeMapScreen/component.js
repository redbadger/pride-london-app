// @flow
import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import Permissions from "react-native-permissions";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { route, region, terminals } from "../../constants/parade-coordinates";
import LocationCard from "./LocationCard";
import Map from "./Map";

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

type State = {
  locationPermission: boolean
};

class ParadeMapScreen extends Component<Props, State> {
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
        <Map
          route={route}
          region={region}
          terminals={terminals}
          permission={this.state.locationPermission}
        />
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
  }
});

export default ParadeMapScreen;
