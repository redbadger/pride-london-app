// @flow
import React, { PureComponent } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import Text from "../../components/Text";
import type { Event } from "../../integrations/cms";
import EventTile from "../../components/EventTile";
import { cardBgColor, imageBgColor } from "../../constants/colors";

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
      <SafeAreaView>
        {this.props.loading && <Text>Loading...</Text>}
        <ScrollView>
          <View style={styles.header}>
            <Text>Header - TBD</Text>
          </View>
          <View style={styles.title}>
            <Text type="h2">Featured events</Text>
            <Text type="text">View all</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.viewLeft}>
              {left.map(event => (
                <View style={styles.tileWrapper}>
                  <EventTile
                    name={event.fields.name[locale]}
                    date="Fri, 15 June"
                  />
                </View>
              ))}
            </View>
            <View style={styles.viewRight}>
              {right.map(event => (
                <View style={styles.tileWrapper}>
                  <EventTile
                    name={event.fields.name[locale]}
                    date="Fri, 15 June"
                  />
                </View>
              ))}
            </View>
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
  header: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: imageBgColor
  },
  title: {
    flexDirection: "row",
    marginLeft: 18,
    marginRight: 18,
    paddingTop: 18,
    justifyContent: "space-between"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 6,
    backgroundColor: cardBgColor
  },
  viewLeft: {
    flex: 1,
    marginLeft: 6
  },
  viewRight: {
    flex: 1,
    marginRight: 6
  },
  tileWrapper: {
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 8
  }
});

export default HomeScreen;
