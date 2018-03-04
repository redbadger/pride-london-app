// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
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
    return (
      <View style={styles.container}>
        <Header
          onBackButtonPress={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <View style={styles.content}>
          <Heading text={this.props.event.fields.name[locale]} />
          <View style={styles.categoryLabelContainer}>
            <CategoryLabel
              categoryName={this.props.event.fields.eventCategory[locale]}
            />
          </View>
          <IconItem icon={<Text type="xSmall">icn</Text>} title="10 June 2018">
            <Text type="small">23:10</Text>
          </IconItem>
          {/* <Text>{JSON.stringify(this.props.event)}</Text> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
