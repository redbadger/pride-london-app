// @flow
import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import type { Event } from "../integrations/cms";
import HeatMap from "../components/HeatMap";
import { bgColor } from "../constants/colors";

type State = {
  events: Event[],
  loaded: boolean,
  refreshing: boolean
};

class HeatMapScreen extends React.Component<{}, State> {
  constructor() {
    super();

    this.state = {
      loaded: false,
      refreshing: false
    };
  }

  async componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ loaded: true });
  }

  onRefreshEvents = () => {
    this.setState({ refreshing: true }, async () => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {!this.state.loaded && <Text>Loading...</Text>}
        <HeatMap
          refreshing={this.state.refreshing}
          onRefresh={this.onRefreshEvents}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor
  }
});

export default HeatMapScreen;
