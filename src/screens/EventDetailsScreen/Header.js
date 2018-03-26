// @flow
import React from "react";
import { Text, StyleSheet, StatusBar, ImageBackground } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import Touchable from "../../components/Touchable";

type Props = {
  onBackButtonPress: () => void,
  imageUrl: string
};

const Header = ({ onBackButtonPress, imageUrl }: Props) => (
  <ImageBackground
    style={styles.header}
    source={{ uri: imageUrl }}
    resizeMode="cover"
  >
    <SafeAreaView>
      <StatusBar barStyle="default" animated />
      <Touchable onPress={onBackButtonPress} style={styles.backButton}>
        <Text>Back</Text>
      </Touchable>
    </SafeAreaView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 180
  },
  backButton: {
    padding: 8
  }
});

export default Header;
