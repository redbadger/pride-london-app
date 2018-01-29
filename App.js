// @flow

import React from "react";
import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import { getEvents, updateEvents } from "./integrations/cms";

const locale = "en-GB";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      loaded: false,
      refreshing: false
    };
  }

  async componentDidMount() {
    const events = await getEvents();

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ events, loaded: true });
  }

  onRefreshEvents = async () => {
    this.setState({ refreshing: true }, async () => {
      const events = await updateEvents();
      this.setState({ events, refreshing: false });
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {!this.state.loaded && <Text>Loading...</Text>}
        <FlatList
          data={this.state.events}
          keyExtractor={event => event.sys.id}
          renderItem={({ item: event }) => (
            <Text>{event.fields.name[locale]}</Text>
          )}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefreshEvents}
        />
      </SafeAreaView>
    );
  }
}

const bgColor = "#F5FCFF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor
  }
});

export default App;
