// @flow
import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { getEvents, updateEvents } from "../integrations/cms";
import type { Event } from "../integrations/cms";
import EventList from "../components/EventList";
import { bgColor } from "../constants/colors";
import { EVENT_DETAILS } from "../constants/routes";

const locale = "en-GB";

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

type State = {
  events: Event[],
  loaded: boolean,
  refreshing: boolean
};

class EventsScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "PRIDE IN LONDON"
  };

  constructor() {
    super();

    this.state = {
      events: [],
      loaded: false,
      refreshing: false
    };
  }

  async componentDidMount() {
    const events = await getEvents();

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ events, loaded: true });
  }

  onRefreshEvents = () => {
    this.setState({ refreshing: true }, async () => {
      const events = await updateEvents();
      this.setState({ events, refreshing: false });
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {!this.state.loaded && <Text>Loading...</Text>}
        <EventList
          locale={locale}
          events={this.state.events}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefreshEvents}
          onPress={(eventName: string) => {
            this.props.navigation.navigate(EVENT_DETAILS, { eventName });
          }}
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

export default EventsScreen;
