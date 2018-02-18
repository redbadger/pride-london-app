// @flow
import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { getEvents, updateEvents } from "../integrations/cms";
import type { Event } from "../integrations/cms";
import EventList from "../components/EventList";
import FilterHeader from "../components/FilterHeader";
import { bgColor, headerBgColor } from "../constants/colors";
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
    headerMode: "none",
    headerStyle: {
      backgroundColor: headerBgColor,
      height: 0,
      borderBottomWidth: 0
    }
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
        <FilterHeader />
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
    backgroundColor: bgColor,
    borderBottomWidth: 0
  }
});

export default EventsScreen;
