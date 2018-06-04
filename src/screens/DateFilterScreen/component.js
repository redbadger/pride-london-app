// @flow
import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Event, EventCategoryName } from "../../data/event";
import { lightNavyBlueColor } from "../../constants/colors";
import text from "../../constants/text";
import Button from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import locale from "../../data/locale";
import Header from "./Header";

class DateFilterScreen extends PureComponent<Props> {
  applyFilters = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header onBack={this.applyFilters} />
        <View style={styles.list}>
          <Text>Hello World!</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: lightNavyBlueColor
  }
});

export default DateFilterScreen;
