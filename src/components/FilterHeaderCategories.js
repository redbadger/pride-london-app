// @flow
import React from "react";
import { View, StyleSheet, Image, PixelRatio } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Touchable from "./Touchable";
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
import type { EventCategoryName } from "../data/event";

type Props = {
  selectedCategories: Set<EventCategoryName>,
  onFilterPress: Function
};

type CategoriesFilterButtonProps = {
  style?: ViewStyleProp,
  onPress: Function
};

const CategoriesFilterButton = ({
  style,
  onPress
}: CategoriesFilterButtonProps) => (
  <Touchable style={[styles.categoriesFilterButton, style]} onPress={onPress}>
    <Image source={chevronRightImg} />
  </Touchable>
);

CategoriesFilterButton.defaultProps = {
  style: {}
};

const FilterHeaderCategories = ({ selectedCategories, onFilterPress }: Props) =>
  selectedCategories.size === 0 ? (
    <View style={styles.contentInterest}>
      {PixelRatio.getFontScale() < 1.5 && (
        <Text
          type="h1"
          style={styles.filterTitle}
          allowFontScaling={false}
          accessible
          accessibilityTraits={["header"]}
          accessibilityLabel={text.tabEvents}
        >
          {text.filterTitle}
        </Text>
      )}
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
      <CategoriesFilterButton onPress={onFilterPress} />
    </View>
  );

const styles = StyleSheet.create({
  contentInterest: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  filterTitle: {
    color: filterShowMeTextColor,
    paddingTop: 8,
    marginRight: 8
  },
  categoryPillsContainer: {
    flexDirection: "row"
  },
  categoriesFilterButton: {
    backgroundColor: categoriesFilterButtonBgColor,
    alignItems: "center",
    width: 44,
    height: 44 * PixelRatio.getFontScale(),
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  categoryPills: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    minHeight: 44
  },
  interestButton: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: 130,
    paddingLeft: 8,
    backgroundColor: interestButtonBgColor,
    borderRadius: 4
  },
  interestButtonText: {
    color: interestButtonTextColor
  }
});

export default FilterHeaderCategories;
