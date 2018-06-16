// @flow
import React, { Component } from "react";
import type { ElementRef } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import Text from "../../components/Text";
import { velvetColor } from "../../constants/colors";
import type {
  Coordinates,
  Region,
  Terminals
} from "../../constants/parade-coordinates";

type Props = {
  route: Array<Coordinates>,
  paradeRegion: Region,
  terminals: Array<Terminals>,
  permission: boolean
};

type State = {
  margin: boolean
};

class Map extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      margin: false
    };
  }

  componentWillMount() {
    setTimeout(() => this.setState({ margin: !this.state.margin }), 500);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.permission !== this.props.permission) {
      setTimeout(() => this.setState({ margin: !this.state.margin }), 500);
    }
  }

  focus(region: Region) {
    this.mapView.animateToRegion(region, 0);
  }

  // $FlowFixMe
  mapView: ElementRef;

  render() {
    return (
      <View style={styles.absoluteFill}>
        <MapView
          style={[
            styles.absoluteFill,
            this.state.margin ? styles.marginTrue : styles.marginFalse
          ]}
          initialRegion={this.props.paradeRegion}
          showsUserLocation={this.props.permission}
          showsUserLocationButton={this.props.permission}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject
  },
  marginTrue: {
    margin: 1
  },
  marginFalse: {
    margin: 0
  }
});

export default Map;
