import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { createClient } from "contentful/dist/contentful.browser.min";
import config from "./config";

const {
  CONTENTFUL_SPACE,
  CONTENTFUL_ACCESS_TOKEN,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_API_KEY,
  FIREBASE_DATABASE_URL
} = config;

const client = createClient({
  space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_ACCESS_TOKEN
});
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: { items: [] }
    };
  }

  async componentDidMount() {
    const events = await client.getEntries();

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      events
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.events.items}
          keyExtractor={item => item.sys.id}
          renderItem={({ item: event }) => (
            <View key={event.sys.id}>
              <Text>{event.fields.name}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center"
  }
});
