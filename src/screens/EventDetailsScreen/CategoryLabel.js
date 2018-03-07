// @flow
import React from "react";
import { StyleSheet } from "react-native";
import Text from "../../components/Text";
import {
  eventCategoryLabelBgColor,
  eventDetailsBgColor
} from "../../constants/colors";

type Props = {
  categoryName: string
};

const CategoryLabel = ({ categoryName }: Props) => (
  <Text style={styles.categoryLabel} type="h3">
    {categoryName}
  </Text>
);

const styles = StyleSheet.create({
  categoryLabel: {
    color: eventDetailsBgColor,
    backgroundColor: eventCategoryLabelBgColor,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8
  }
});

export default CategoryLabel;
