// @flow
import React from "react";
import { Text as RnText, StyleSheet } from "react-native";
import Text from "../../components/Text";
import { eventCategoryLabelBgColor } from "../../constants/colors";

type Props = {
  categoryName: string
};

const CategoryLabel = ({ categoryName }: Props) => (
  <RnText>
    <Text style={styles.categoryLabel} type="h3">
      {`  ${categoryName}  `}
    </Text>
  </RnText>
);

const styles = StyleSheet.create({
  categoryLabel: {
    backgroundColor: eventCategoryLabelBgColor
  }
});

export default CategoryLabel;
