// @flow
import React, { PureComponent } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity
} from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import Text from "../../components/Text";
import type { Event, Asset } from "../../data/event";
import EventTile from "../../components/EventTile";
import {
  cardBgColor,
  imageBgColor,
  titleTextColor
} from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";

const locale = "en-GB";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: Event[],
  loading: boolean,
  getAssetById: string => Asset
};

class HomeScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null
  };

  eventDetails = (eventId: string) => {
    this.props.navigation.navigate(EVENT_DETAILS, { eventId });
  };

  eventList = () => {};

  render() {
    return (
      <SafeAreaView testID="home-screen">
        {this.props.loading && <Text>Loading...</Text>}
        <ScrollView style={styles.scroller}>
          <View style={styles.header}>
            <Text>Header - TBD</Text>
          </View>
          <View style={styles.sectionTitle}>
            <Text type="h2" style={{ color: titleTextColor }}>
              Featured events
            </Text>
            <TouchableOpacity onPress={this.eventList}>
              <Text type="text" style={{ color: titleTextColor }}>
                View all
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            {this.props.events.map(event => (
              <TouchableOpacity
                key={event.sys.id}
                style={styles.tile}
                onPress={() => this.eventDetails(event.sys.id)}
                accessibilityTraits={["button"]}
                accessibilityComponentType="button"
                delayPressIn={50}
                testID={`event-tile-${event.sys.id}`}
              >
                <EventTile
                  name={event.fields.name[locale]}
                  date={event.fields.startTime[locale]}
                  imageUrl={`https:${
                    this.props.getAssetById(
                      event.fields.eventsListPicture[locale].sys.id
                    ).fields.file[locale].url
                  }`}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scroller: {
    backgroundColor: cardBgColor
  },
  header: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: imageBgColor
  },
  sectionTitle: {
    flexDirection: "row",
    marginHorizontal: 16,
    paddingTop: 18,
    justifyContent: "space-between"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 12
  },
  tile: {
    width: "50%",
    paddingHorizontal: 4,
    marginBottom: 8
  }
});

export default HomeScreen;
