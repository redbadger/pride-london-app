// @flow

import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import ContentfulClient from "./src/Contentful/Client";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this.client = new ContentfulClient();
  }

  componentDidMount() {
    return this.client
      .allEvents()
      .then(events => {
        this.setState(
          {
            isLoading: false,
            eventsData: events
          },
          () => {
            // do something with new state
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.eventsData}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Text>{item.name}</Text>
              <Text>{item.addressName}</Text>
              <Text>
                {new Date(item.startTime).toLocaleString("en-UK")} -{" "}
                {new Date(item.endTime).toLocaleString("en-UK")}
              </Text>
              <Text>
                {item.lowestPrice} - {item.highestPrice}
              </Text>
              <Image
                style={styles.heroImage}
                resizeMode="contain"
                source={{ uri: item.heroImage }}
              />
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heroImage: {
    alignSelf: "center",
    width: 400,
    height: 300
  }
});
