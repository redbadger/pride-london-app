// @flow
import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions
} from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {
  interestButtonBgColor,
  interestButtonTextColor,
  filterShowMeTextColor,
  categoriesFilterButtonBgColor
} from "../constants/colors";
import text from "../constants/text";
import Text from "./Text";
import CategoriesPills from "./CategoriesPills";
import chevronRightImg from "../../assets/images/chevronRight.png";

type Props = {
  selectedCategories: Set<string>,
  onFilterPress: Function
};

type CategoriesFilterButtonProps = {
  style?: StyleObj,
  onPress: Function
};

const CategoriesFilterButton = ({
  style,
  onPress
}: CategoriesFilterButtonProps) => (
  <TouchableHighlight
    accessibilityTraits={["button"]}
    accessibilityComponentType="button"
    style={[styles.categoriesFilterButton, style]}
    onPress={onPress}
  >
    <Image source={chevronRightImg} />
  </TouchableHighlight>
);

CategoriesFilterButton.defaultProps = {
  style: {}
};

const FilterHeaderCategories = ({ selectedCategories, onFilterPress }: Props) =>
  selectedCategories.size === 0 ? (
    <View style={styles.contentInterest}>
      <Text type="h1" style={styles.filterTitle}>
        {text.filterTitle}
      </Text>
      <View style={styles.interestButton}>
        <Text type="h2" style={styles.interestButtonText}>
          {text.filterByInterest}
        </Text>
        <CategoriesFilterButton onPress={onFilterPress} />
      </View>
    </View>
  ) : (
    <View style={styles.categoryPillsContainer}>
      <CategoriesPills
        style={styles.categoryPills}
        selectedCategories={selectedCategories}
      />
      <CategoriesFilterButton
        style={styles.categoriesFilterOverButton}
        onPress={onFilterPress}
      />
    </View>
  );

const styles = StyleSheet.create({
  contentInterest: {
    alignItems: "center",
    flexDirection: "row"
  },
  filterTitle: {
    color: filterShowMeTextColor,
    paddingTop: 5,
    marginRight: 8
  },
  categoryPillsContainer: {
    position: "relative"
  },
  categoryPills: {
    width: Dimensions.get("window").width - 50
  },
  categoriesFilterButton: {
    width: 38,
    height: 40,
    backgroundColor: categoriesFilterButtonBgColor,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  categoriesFilterOverButton: {
    position: "absolute",
    right: 0,
    top: 0
  },
  interestButton: {
    width: 145,
    height: 40,
    backgroundColor: interestButtonBgColor,
    borderRadius: 4,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8
  },
  interestButtonText: {
    color: interestButtonTextColor
  }
});

export default FilterHeaderCategories;
