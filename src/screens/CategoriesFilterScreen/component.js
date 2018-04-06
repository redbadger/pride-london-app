// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Event } from "../../data/event";
import Text from "../../components/Text";
import {
  eucalyptusGreenColor,
  lightNavyBlueColor
} from "../../constants/colors";
import text from "../../constants/text";
import ContentPadding from "../../components/ContentPadding";
import Header from "./Header";
import List from "./List";

const locale = "en-GB";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: Event[],
  stagedCategories: Set<string>,
  toggleCategoryFilter: Function,
  onApplyFilters: Function,
  onClearAll: Function,
  onClose: Function
};

class CategoriesFilterScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

  static defaultProps = {
    toggleCategoryFilter: () => {},
    onApplyFilters: () => {},
    onClearAll: () => {},
    onClose: () => {}
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
        <ContentPadding>
          <View>
            <TouchableOpacity
              style={styles.showEventsButton}
              onPress={this.handleApplyFilters}
              disabled={!events.length}
            >
              <Text type="h2" style={styles.showEventsText}>
                {text.showEvents(events.length)}
              </Text>
            </TouchableOpacity>
          </View>
        </ContentPadding>
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
  showEventsButton: {
    backgroundColor: eucalyptusGreenColor,
    width: "100%",
    paddingTop: 13,
    paddingBottom: 11,
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 16
  },
  showEventsText: {
    color: lightNavyBlueColor,
    textAlign: "center"
  }
});

export default CategoriesFilterScreen;
