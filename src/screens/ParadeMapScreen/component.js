// @flow
import React, { Component } from "react";
import type { ElementRef } from "react";
import { StyleSheet, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { route, region, terminals } from "../../constants/parade-coordinates";
import LocationCard from "./LocationCard";
import Map from "./Map";

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

class ParadeMapScreen extends Component<Props> {
  componentDidMount() {
    this.didBlur = this.props.navigation.addListener(
      "didBlur",
      this.returnToParade
    );
  }

  componentWillUnmount() {
    this.didBlur.remove();
  }

  // $FlowFixMe
  mapRef: ElementRef<typeof Map> = React.createRef();
  didBlur: Function;

  returnToParade = () => {
    this.mapRef.current.focus(region);
  };

  render() {
    return (
      <View style={styles.container} testID="parade-map-screen">
        <Map
          route={route}
          paradeRegion={region}
          terminals={terminals}
          ref={this.mapRef}
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
