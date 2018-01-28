// @flow

import React from "react";
import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import { getEvents } from "./integrations/cms";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      loaded: false
    };
  }

  async componentDidMount() {
    const events = await getEvents();

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ events, loaded: true });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {!this.state.loaded && <Text>Loading...</Text>}
        <FlatList
          data={this.state.events}
          keyExtractor={event => event.sys.id}
          renderItem={({ item: event }) => <Text>{event.fields.name}</Text>}
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
