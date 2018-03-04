// @flow
import React from "react";
import { Text, StyleSheet } from "react-native";
import Heading from "../../components/Heading";
import { eventCategoryLabelBgColor } from "../../constants/colors";

type Props = {
  categoryName: string
};

const CategoryLabel = ({ categoryName }: Props) => (
  <Text>
    <Heading
      style={styles.categoryLabel}
      text={`  ${categoryName}  `}
      level={3}
    />
  </Text>
);

const styles = StyleSheet.create({
  categoryLabel: {
    backgroundColor: eventCategoryLabelBgColor
  }
});

export default CategoryLabel;
