// @flow
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

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
  navigation: NavigationScreenProp<{ params: { eventName: String } }>
};

class EventsScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Header
          onBackButtonPress={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <Text>{this.props.navigation.state.params.eventName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 22
  }
});

export default EventsScreen;
