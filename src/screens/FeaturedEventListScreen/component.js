// @flow
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import type { EventDays, Asset } from "../../data/event";
import EventList from "../../components/EventList";
import { bgColor } from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";

const locale = "en-GB";

type Props = {
  navigation: NavigationScreenProp<{ params: { title: string } }>,
  events: EventDays,
  getAssetById: string => Asset
};

class EventsScreen extends PureComponent<Props> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<{ params: { title: string } }>
  }) => {
    const { params } = navigation.state;

    return {
      title: params.title
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <EventList
          locale={locale}
          events={this.props.events}
          onPress={(eventId: string) => {
            this.props.navigation.navigate(EVENT_DETAILS, { eventId });
          }}
          getAssetById={this.props.getAssetById}
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
