// @flow
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import Header from "./Header";
import IconItem from "./IconItem";
import CategoryLabel from "./CategoryLabel";
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import { eventDetailsBgColor } from "../../constants/colors";
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
          <Heading text={event.fields.name[locale]} />
          <View style={styles.categoryLabelContainer}>
            <CategoryLabel categoryName={event.fields.eventCategory[locale]} />
          </View>
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
          {/* <Text>{JSON.stringify(this.props.event)}</Text> */}
        </View>
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
  }
});

export default EventDetailsScreen;
