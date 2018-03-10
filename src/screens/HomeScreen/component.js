// @flow
import React, { PureComponent } from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import type { Event } from "../../integrations/cms";
import EventTile from "../../components/EventTile";
import { bgColor } from "../../constants/colors";

const locale = "en-GB";

type Props = {
  events: Event[],
  loading: boolean
};

class HomeScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    const [left: Event[], right: Event[]] = splitEvents(this.props.events);
    return (
      <SafeAreaView style={styles.container}>
        {this.props.loading && <Text>Loading...</Text>}
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.view}>
            {left.map(event => (
              <View style={styles.tileWrapperLeft}>
                <EventTile name={event.fields.name[locale]} />
              </View>
            ))}
          </View>
          <View style={styles.view}>
            {right.map(event => (
              <View style={styles.tileWrapperRight}>
                <EventTile name={event.fields.name[locale]} />
              </View>
            ))}
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
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: bgColor
  },
  view: {
    flex: 1,
    margin: 4
  },
  tileWrapperLeft: {
    marginLeft: 4,
    marginBottom: 8
  },
  tileWrapperRight: {
    marginRight: 4,
    marginBottom: 8
  }
});

export default HomeScreen;
