// @flow
import React, { PureComponent } from "react";
import {
  Animated,
  Platform,
  RefreshControl,
  StyleSheet,
  StatusBar
} from "react-native";
import SaveAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { EventDays } from "../../data/event";
import EventList from "../../components/EventList";
import FilterHeader from "../../components/ConnectedFilterHeader";
import { bgColor } from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";

const locale = "en-GB";
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 0 });
const HEADER_HEIGHT = 120;

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: EventDays,
  loading: boolean,
  refreshing: boolean,
  updateEvents: () => Promise<void>
};

class EventsScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.scrollAnim = new Animated.Value(0);
    this.clampedScroll = Animated.diffClamp(
      this.scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp"
      }),
      0,
      HEADER_HEIGHT + STATUS_BAR_HEIGHT
    );
  }

  scrollAnim: Animated.Value;
  clampedScroll: any;

  render() {
    const headerTranslate = this.clampedScroll.interpolate({
      inputRange: [0, HEADER_HEIGHT + STATUS_BAR_HEIGHT],
      outputRange: [0, -(HEADER_HEIGHT + STATUS_BAR_HEIGHT)],
      extrapolate: "clamp"
    });

    return (
      <SaveAreaView style={styles.container}>
        <StatusBar barStyle="light-content" animated />
        <EventList
          locale={locale}
          events={this.props.events}
          onPress={(eventId: string) => {
            this.props.navigation.navigate(EVENT_DETAILS, { eventId });
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollAnim } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={1}
          contentContainerStyle={styles.listContentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading || this.props.refreshing}
              onRefresh={() => {
                this.props.updateEvents();
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_HEIGHT + STATUS_BAR_HEIGHT}
            />
          }
        />
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <FilterHeader />
        </Animated.View>
      </SaveAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT
  },
  listContentContainer: {
    paddingTop: HEADER_HEIGHT
  }
});

export default EventsScreen;
