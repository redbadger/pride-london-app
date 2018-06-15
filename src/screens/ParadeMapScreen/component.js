// @flow
import React, { Component } from "react";
import type { ElementRef } from "react";
import { StyleSheet, View } from "react-native";
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

  // $FlowFixMe: For some reason flow doesn't know about React.createRef.
  map: ElementRef = React.createRef();
  didBlur: Function;

  componentDidMount() {
    this.checkPermission();
    this.didBlur = this.props.navigation.addListener(
      "didBlur",
      this.returnToParade.bind(this)
    );
  }

  componentWillUnmount() {
    this.didBlur.remove();
  }

  returnToParade = () => {
    this.map.focus(region);
  };

  checkPermission = () => {
    Permissions.check("location").then(response => {
      response === "authorized"
        ? this.setState({ locationPermission: true })
        : this.requestPermission();
    });
  };

  requestPermission = () => {
    Permissions.request("location").then(response => {
      if (response === "authorized")
        this.setState({ locationPermission: true });
    });
  };

  render() {
    return (
      <View style={styles.container} testID="parade-map-screen">
        <Map
          route={route}
          paradeRegion={region}
          terminals={terminals}
          permission={this.state.locationPermission}
          ref={this.map}
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
