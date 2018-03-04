// @flow
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

type HeaderProps = {
  onBackButtonPress: () => void
};

const Header = ({ onBackButtonPress }: HeaderProps) => (
  <SafeAreaView>
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackButtonPress}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  header: {
    height: 180,
    padding: 22
  }
});

export default Header;
