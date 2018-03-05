// @flow
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import Header from "./Header";
import IconItem from "./IconItem";
import CategoryLabel from "./CategoryLabel";
import Text from "../../components/Text";
import {
  eventDetailsBgColor,
  eventDetailsHeaderBgColor
} from "../../constants/colors";
import text from "../../constants/text";
import type { Event } from "../../integrations/cms";

const locale = "en-GB";

type Props = {
  navigation: NavigationScreenProp<{ params: { eventId: String } }>,
  event: Event
};

class EventDetailsScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    const { event } = this.props;
    const startTime = new Date(this.props.event.fields.startTime[locale]);
    const endTime = new Date(this.props.event.fields.endTime[locale]);
    const dateFormat = {
      day: "2-digit",
      month: "long",
      year: "numeric"
    };
    const timeFormat = {
      hour: "numeric",
      minute: "numeric"
    };
    return (
      <ScrollView style={styles.container}>
        <Header
          onBackButtonPress={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <View style={styles.content}>
          <Text type="h1">{event.fields.name[locale]}</Text>
          <View style={styles.categoryLabelContainer}>
            <CategoryLabel categoryName={event.fields.eventCategory[locale]} />
          </View>
          <View style={styles.iconItemWrapper}>
            <IconItem
              icon={<Text type="xSmall">icn</Text>}
              title={`${startTime.toLocaleDateString(
                locale,
                dateFormat
              )} - ${endTime.toLocaleDateString(locale, dateFormat)}`}
            >
              <Text type="small">
                {`${startTime.toLocaleTimeString(
                  locale,
                  timeFormat
                )} - ${endTime.toLocaleTimeString(locale, timeFormat)}`}
              </Text>
            </IconItem>
          </View>
          <View style={styles.iconItemWrapper}>
            <IconItem
              icon={<Text type="xSmall">icn</Text>}
              title={event.fields.locationName[locale]}
            />
          </View>
          <View style={styles.iconItemWrapper}>
            <IconItem
              icon={<Text type="xSmall">icn</Text>}
              title={`${text.eventDetailsPrice}${
                event.fields.eventPriceLow[locale]
              }`}
            />
          </View>
          <View style={styles.iconItemWrapper}>
            <IconItem
              icon={<Text type="xSmall">icn</Text>}
              title={text.eventDetailsAccessibility}
            >
              <Text type="small">
                {event.fields.accessibilityOptions[locale].join(", ")}
              </Text>
            </IconItem>
          </View>
        </View>
        <View style={styles.sectionDivider} />
        <View style={styles.content}>
          <Text markdown>{event.fields.eventDescription[locale]}</Text>
        </View>
        {/* <Text>{JSON.stringify(this.props.event)}</Text> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: eventDetailsBgColor
  },
  content: {
    flex: 1,
    padding: 15,
    backgroundColor: eventDetailsBgColor
  },
  categoryLabelContainer: {
    marginTop: 16,
    marginBottom: 28
  },
  iconItemWrapper: {
    marginBottom: 20
  },
  sectionDivider: {
    height: 4,
    backgroundColor: eventDetailsHeaderBgColor
  }
});

export default EventDetailsScreen;
