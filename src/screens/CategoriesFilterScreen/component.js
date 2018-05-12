// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Event, EventCategoryName } from "../../data/event";
import { lightNavyBlueColor } from "../../constants/colors";
import text from "../../constants/text";
import Button from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import Header from "./Header";
import List from "./List";
import locale from "../../data/locale";

export type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: Event[],
  stagedCategories: Set<EventCategoryName>,
  toggleCategoryFilter: (Set<EventCategoryName>, string) => void,
  onApplyFilters: () => void,
  onClearAll: () => void,
  onClose: () => void
};

class CategoriesFilterScreen extends PureComponent<Props> {
  static navigationOptions = {
    tabBarVisible: false
  };

  handleClose = () => {
    this.props.onClose();
    this.props.navigation.goBack();
  };

  handleClearAll = () => {
    this.props.onClearAll();
  };

  handleApplyFilters = () => {
    this.props.onApplyFilters();
    this.props.navigation.pop();
  };

  handleFilterChange = (categoryLabel: string) => {
    this.props.toggleCategoryFilter(this.props.stagedCategories, categoryLabel);
  };

  render() {
    const { events, stagedCategories } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ContentPadding style={styles.header}>
          <Header
            onClose={this.handleClose}
            onClearAll={this.handleClearAll}
            selectedCategories={stagedCategories}
          />
        </ContentPadding>
        <View style={styles.list}>
          <List
            locale={locale}
            stagedCategories={stagedCategories}
            onPress={this.handleFilterChange}
          />
        </View>
        <View style={styles.footer}>
          <ContentPadding>
            <Button onPress={this.handleApplyFilters} disabled={!events.length}>
              {text.showEvents(events.length)}
            </Button>
          </ContentPadding>
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
  },
  header: {
    borderWidth: 0
  },
  list: {
    flex: 1
  },
  footer: {
    paddingVertical: 12,
    backgroundColor: lightNavyBlueColor
  }
});

export default CategoriesFilterScreen;
