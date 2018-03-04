// @flow
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import Heading from "../../components/Heading";
import {
  eventDetailsBgColor,
  eventCategoryLabelBgColor
} from "../../constants/colors";
import type { Event } from "../../integrations/cms";

const locale = "en-GB";

type HeaderProps = {
  onBackButtonPress: () => void
};

const Header = ({ onBackButtonPress }: HeaderProps) => (
  <SafeAreaView>
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackButtonPress}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

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
          <Text>
            <Heading
              style={styles.categoryLabel}
              text={`  ${this.props.event.fields.eventCategory[locale]}  `}
              level={3}
            />
          </Text>
          <Text>{JSON.stringify(this.props.event)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 180,
    padding: 22
  },
  content: {
    flex: 1,
    padding: 15,
    backgroundColor: eventDetailsBgColor
  },
  categoryLabel: {
    backgroundColor: eventCategoryLabelBgColor
  }
});

export default EventDetailsScreen;
