// @flow
import React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Event } from "../../integrations/cms";
import EventList from "../../components/EventList";
import FilterHeader from "../../components/FilterHeader";
import { bgColor, headerBgColor } from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";

const locale = "en-GB";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: Event[],
  loading: boolean,
  refreshing: boolean,
  updateEvents: () => Promise<void>
};

class EventsScreen extends React.Component<Props> {
  static navigationOptions = {
    header: <FilterHeader />
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.props.loading && <Text>Loading...</Text>}
        <EventList
          locale={locale}
          events={this.props.events}
          refreshing={this.props.refreshing}
          onRefresh={() => {
            this.props.updateEvents();
          }}
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
