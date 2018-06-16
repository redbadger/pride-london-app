// @flow
import React from "react";
import { View, StyleSheet, Image, PixelRatio, Platform } from "react-native";
import Touchable from "../../components/Touchable";
import {
  interestButtonBgColor,
  interestButtonTextColor,
  filterShowMeTextColor,
  categoriesFilterButtonBgColor
} from "../../constants/colors";
import text from "../../constants/text";
import Text, { scaleWithFont } from "../../components/Text";
import CategoriesPills from "../../components/CategoriesPills";
import chevronRightImg from "../../../assets/images/chevronRight.png";
import type { EventCategoryName } from "../../data/event";

type Props = {
  selectedCategories: Set<EventCategoryName>,
  onFilterPress: Function
};

type CategoriesFilterButtonProps = {
  onPress?: Function
};

export const CategoriesFilterButton = ({
  onPress
}: CategoriesFilterButtonProps) => (
  <Touchable
    accessibilityLabel={text.categoryFilterButton}
    style={styles.categoriesFilterButton}
    onPress={onPress}
    testID="categories-filter-button"
  >
    <Image source={chevronRightImg} />
  </Touchable>
);

CategoriesFilterButton.defaultProps = {
  onPress: () => {}
};

const FilterHeaderCategories = ({ selectedCategories, onFilterPress }: Props) =>
  selectedCategories.size === 0 ? (
    <View style={styles.contentInterest} onPress={onFilterPress}>
      {PixelRatio.getFontScale() < 1.5 && (
        <Text
          type="h1"
          style={styles.filterTitle}
          allowFontScaling={false}
          accessible
          accessibilityTraits={["header"]}
          accessibilityLabel={text.filterTitle}
        >
          {text.filterTitle}
        </Text>
      )}
      <Touchable
        style={styles.interestButton}
        onPress={onFilterPress}
        accessibilityLabel={text.categoryFilterButton}
        testID="open-category-filters-button"
      >
        <Text type="h2" style={styles.interestButtonText}>
          {text.filterByInterest}
        </Text>
        <CategoriesFilterButton onPress={onFilterPress} />
      </Touchable>
    </View>
  ) : (
    <View style={styles.categoryPillsContainer}>
      <CategoriesPills
        style={styles.categoryPills}
        selectedCategories={selectedCategories}
        onPress={onFilterPress}
      />
      <CategoriesFilterButton onPress={onFilterPress} />
    </View>
  );

const verticalTextCorrection = Platform.OS === "ios" ? 4 : 2;

const styles = StyleSheet.create({
  contentInterest: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  filterTitle: {
    color: filterShowMeTextColor,
    paddingTop: verticalTextCorrection,
    marginRight: 8
  },
  categoryPillsContainer: {
    flexDirection: "row"
  },
  categoriesFilterButton: {
    backgroundColor: categoriesFilterButtonBgColor,
    alignItems: "center",
    width: 44,
    height: scaleWithFont("h3", 44),
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
    marginTop: verticalTextCorrection,
    color: interestButtonTextColor
  }
});

export default FilterHeaderCategories;
