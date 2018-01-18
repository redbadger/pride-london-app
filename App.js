import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import MockClient from "./MockClient";

const client = MockClient; // Swap this out for the Contentful client in prod
const EVENTS_CONTENT_TYPE_SYS_ID = 123; // This will eventually be dynamic, based on the id in Contentful
const styles = StyleSheet.create({
  heroImage: {
    alignSelf: "center",
    width: 400,
    height: 300
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    return client
      .getEntries({
        content_type: EVENTS_CONTENT_TYPE_SYS_ID
      })
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
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
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Text>{item.name}</Text>
              <Text>{item.addressName}</Text>
              <Text>
                {item.startTime} - {item.endTime}
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
