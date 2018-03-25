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

type ColumnProps = {
  column: number,
  events: Event[],
  onPress: (eventId: string) => void,
  getAssetById: string => Asset
};
const Column = ({ column, events, onPress, getAssetById }: ColumnProps) => (
  <View style={column === 0 ? styles.viewLeft : styles.viewRight}>
    {events.map(event => (
      <TouchableOpacity
        key={event.sys.id}
        style={styles.tileWrapper}
        onPress={() => onPress(event.sys.id)}
        accessibilityTraits={["button"]}
        accessibilityComponentType="button"
        delayPressIn={50}
      >
        <EventTile
          name={event.fields.name[locale]}
          date={event.fields.startTime[locale]}
          imageUrl={`https:${
            getAssetById(event.fields.eventsListPicture[locale].sys.id).fields
              .file[locale].url
          }`}
        />
      </TouchableOpacity>
    ))}
  </View>
);

class HomeScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null
  };
  eventDetails = (eventId: string) => {
    this.props.navigation.navigate(EVENT_DETAILS, { eventId });
  };
  eventList = () => {};
  render() {
    const [left: Event[], right: Event[]] = splitEvents(this.props.events);
    return (
      <SafeAreaView testID="home-screen">
        {this.props.loading && <Text>Loading...</Text>}
        <ScrollView style={styles.scroller}>
          <View style={styles.header}>
            <Text>Header - TBD</Text>
          </View>
          <View style={styles.title}>
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
            <Column
              column={0}
              events={left}
              onPress={this.eventDetails}
              getAssetById={this.props.getAssetById}
            />
            <Column
              column={1}
              events={right}
              onPress={this.eventDetails}
              getAssetById={this.props.getAssetById}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function splitEvents(elements: any[]): any[][] {
  const left = [];
  const right = [];
  elements.forEach((v, i) => {
    const arr = i % 2 === 0 ? left : right;
    arr.push(v);
  });
  return [left, right];
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
  title: {
    flexDirection: "row",
    marginLeft: 18,
    marginRight: 18,
    paddingTop: 18,
    justifyContent: "space-between"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 6
  },
  viewLeft: {
    flex: 1,
    marginLeft: 6
  },
  viewRight: {
    flex: 1,
    marginRight: 6
  },
  tileWrapper: {
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 8
  }
});

export default HomeScreen;
