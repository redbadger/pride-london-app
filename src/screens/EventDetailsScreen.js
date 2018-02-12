// @flow
import React from "react";
import { View } from "react-native";
import type { NavigationNavigatorProps } from "react-navigation";

class EventsScreen extends React.Component<{}> {
  static navigationOptions = ({
    navigation
  }: NavigationNavigatorProps<*, *>) => {
    const { params } = navigation.state;
    return {
      title: params ? params.eventName : "Details"
    };
  };

  render() {
    return <View />;
  }
}

export default EventsScreen;
