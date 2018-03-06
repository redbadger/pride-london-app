// @flow
import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { showLocation } from "react-native-map-link";
import type { NavigationScreenProp } from "react-navigation";
import Header from "./Header";
import IconItem from "./IconItem";
import CategoryLabel from "./CategoryLabel";
import Text from "../../components/Text";
import Button from "../../components/Button";
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

const onMapPress = (lat, lon, title) => {
  showLocation({
    latitude: lat,
    longitude: lon,
    title
  });
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
          <TouchableOpacity
            style={styles.mapWrapper}
            onPress={() =>
              onMapPress(
                event.fields.location[locale].lat,
                event.fields.location[locale].lon,
                event.fields.locationName[locale]
              )
            }
          >
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: event.fields.location[locale].lat,
                longitude: event.fields.location[locale].lon,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              loadingEnabled
            >
              <Marker
                coordinate={{
                  latitude: event.fields.location[locale].lat,
                  longitude: event.fields.location[locale].lon
                }}
              />
            </MapView>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionDivider} />
        <View style={styles.content}>
          {event.fields.accessibilityDetails && (
            <View style={styles.detailsSection}>
              <Text type="h2">{text.eventDetailsAccessibilityDetails}</Text>
              <View style={styles.accessibilityDetailsItem}>
                <Text>{event.fields.accessibilityDetails[locale]}</Text>
              </View>
            </View>
          )}
          {(event.fields.email || event.fields.phone) && (
            <View style={styles.detailsSection}>
              <Text type="h2">{text.eventDetailsContact}</Text>
              {event.fields.email && (
                <View style={styles.contactItem}>
                  <IconItem
                    icon={<Text type="xSmall">icn</Text>}
                    title={event.fields.email[locale]}
                  />
                </View>
              )}
              {event.fields.phone && (
                <View style={styles.contactItem}>
                  <IconItem
                    icon={<Text type="xSmall">icn</Text>}
                    title={event.fields.phone[locale]}
                  />
                </View>
              )}
            </View>
          )}
          <View style={styles.buyButton}>
            <Button
              text={text.eventDetailsBuyButton}
              url={event.fields.ticketingUrl[locale]}
            />
          </View>
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
  },
  iconItemWrapper: {
    marginBottom: 20
  },
  sectionDivider: {
    height: 4,
    backgroundColor: eventDetailsHeaderBgColor
  },
  mapWrapper: {
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 8
  },
  map: {
    height: 160
  },
  detailsSection: {
    marginBottom: 20
  },
  accessibilityDetailsItem: {
    marginTop: 8
  },
  contactItem: {
    marginTop: 16
  },
  buyButton: {
    marginTop: 16
  }
});

export default EventDetailsScreen;
