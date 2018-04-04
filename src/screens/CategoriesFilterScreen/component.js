// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Event, EventCategoryList } from "../../data/event";
import Text from "../../components/Text";
import {
  eucalyptusGreenColor,
  lightNavyBlueColor
} from "../../constants/colors";
import text from "../../constants/text";
import ContentPadding from "../../components/ContentPadding";
import Header from "./Header";
import categories from "../../constants/event-categories";
import CategoriesFilterList from "../../components/CategoriesFilterList";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: Event[],
  onFiltersChange: Function,
  onClearAll: Function
};

const categoryList = (locale: string): EventCategoryList =>
  Object.keys(categories[locale]).map(key => categories[locale][key]);

class CategoriesFilterScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

  static defaultProps = {
    onFiltersChange: () => {},
    onClearAll: () => {}
  };

  handleClose = () => {
    this.props.navigation.goBack();
  };

  handleClearAll = () => {
    this.props.onClearAll();
  };

  handleShowCategories = () => {
    this.props.navigation.pop();
  };

  handleFilterChange = () => {
    // TODO: Apply result from actual category selection
    this.props.onFiltersChange(["Music"]);
  };

  render() {
    const { events } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ContentPadding style={styles.contents}>
          <Header onClose={this.handleClose} onClearAll={this.handleClearAll} />
          <View style={styles.categoriesList}>
            <CategoriesFilterList
              categories={categoryList("en-GB")}
              onPress={this.handleFilterChange}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.showEventsButton}
              onPress={this.handleShowCategories}
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
    backgroundColor: lightNavyBlueColor
  },
  contents: {
    flex: 1,
    justifyContent: "space-between"
  },
  categoriesList: {
    backgroundColor: eucalyptusGreenColor,
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
