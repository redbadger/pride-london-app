// @flow
import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { CmsEvent } from "../../integrations/cms";
import EventList from "../../components/EventList";
import FilterHeader from "../../components/FilterHeader";
import { bgColor } from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";

const locale = "en-GB";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: CmsEvent[],
  loading: boolean,
  refreshing: boolean,
  updateEvents: () => Promise<void>
};

class EventsScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <FilterHeader />
        {this.props.loading && <Text>Loading...</Text>}
        <EventList
          locale={locale}
          events={this.props.events}
          refreshing={this.props.refreshing}
          onRefresh={() => {
            this.props.updateEvents();
          }}
          onPress={(eventId: string) => {
            this.props.navigation.navigate(EVENT_DETAILS, { eventId });
          }}
        />
      </View>
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
