// @flow
import React from "react";
import { View } from "react-native";
import type { NavigationNavigatorProps } from "react-navigation";
import text from "../constants/text";

class EventsScreen extends React.Component<{}> {
  static navigationOptions = ({
    navigation
  }: NavigationNavigatorProps<*, *>) => {
    const { params } = navigation.state;
    return {
      title: params ? params.eventName : "Details",
      tabBarLabel: text.tabEvents
    };
  };

  render() {
    return <View />;
  }
}

export default EventsScreen;
