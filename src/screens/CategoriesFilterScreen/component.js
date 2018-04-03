// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Event } from "../../data/event";
import Text from "../../components/Text";
import {
  whiteColor,
  darkBlueGreyTwoColor,
  eucalyptusGreenColor,
  lightNavyBlueColor
} from "../../constants/colors";
import text from "../../constants/text";

import ContentPadding from "../../components/ContentPadding";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  events: Event[]
};

class CategoriesFilterScreen extends PureComponent<Props> {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

  handleClose = () => {
    this.props.navigation.goBack();
  };

  handleShowCategories = () => {
    // TODO
  };

  render() {
    const { events } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ContentPadding style={styles.contents}>
          <View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={this.handleClose}
              >
                <Text type="h4" style={styles.actionButtonText}>
                  {text.cancel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
                <Text type="h4" style={styles.actionButtonText}>
                  {text.clearAll}
                </Text>
              </TouchableOpacity>
            </View>
            <Text type="h1" style={styles.filterTitle}>
              {text.filterTitle}
            </Text>
            <View style={styles.selectedCategoriesPills}>
              <Text type="h2" style={styles.zeroSelected}>
                {text.zeroSelected}
              </Text>
            </View>
          </View>
          <View style={styles.categoriesList} />
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
  actionButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  actionButton: {
    width: 60
  },
  actionButtonText: {
    color: eucalyptusGreenColor
  },
  filterTitle: {
    color: whiteColor,
    marginTop: 14,
    marginBottom: 6
  },
  selectedCategoriesPills: {
    backgroundColor: darkBlueGreyTwoColor,
    paddingTop: 11,
    paddingBottom: 9,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,
    marginBottom: 16
  },
  zeroSelected: {
    color: eucalyptusGreenColor
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
