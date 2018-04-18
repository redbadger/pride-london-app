// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import ActionButton from "../../components/ActionButton";
import Text from "../../components/Text";
import ContentPadding from "../../components/ContentPadding";
import { lightNavyBlueColor, whiteColor } from "../../constants/colors";
import text from "../../constants/text";

type Props = {
  onClearPress: () => void,
  onCancelPress: () => void
};

const Header = ({ onClearPress, onCancelPress }: Props) => (
  <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
    <ContentPadding style={styles.content}>
      <ActionButton label={text.cancel} onPress={onCancelPress} />
      <View style={styles.titleWrapper}>
        <Text type="h2" style={styles.titleText}>
          {text.filterEvents}
        </Text>
      </View>
      <ActionButton label={text.clearAll} onPress={onClearPress} />
    </ContentPadding>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: lightNavyBlueColor
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleWrapper: { paddingTop: 4 },
  titleText: { color: whiteColor }
});

export default Header;
