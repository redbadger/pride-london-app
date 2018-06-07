// @flow
import React, { PureComponent } from "react";
import {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  ScrollView
} from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import Text from "../../components/Text";
import ButtonPrimary from "../../components/ButtonPrimary";
import LayoutColumn from "../../components/LayoutColumn";
import ContentPadding from "../../components/ContentPadding";
import iconSave from "../../../assets/images/save.png";
import noSavedEvents from "../../../assets/images/howToSaveEvents.png";
import text from "../../constants/text";
import { EVENT_LIST } from "../../constants/routes";

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

class NoSavedEvents extends PureComponent<Props> {
  eventList = () => {
    this.props.navigation.navigate(EVENT_LIST);
  };

  render() {
    return (
      <ScrollView>
        <ContentPadding style={styles.container}>
          <LayoutColumn spacing={12}>
            <Image style={styles.image} source={noSavedEvents} />
            <Text type="h1" color="lightNavyBlueColor" style={styles.title}>
              {text.noSavedEventsTitle}
            </Text>
            <Text
              style={styles.infoText}
              accessibilityLabel={`${text.noSavedEventsPart1} ${
                text.noSavedEventsSaveButtonAlt
              } ${text.noSavedEventsPart2}`}
            >
              {text.noSavedEventsPart1}&nbsp;
              <Image style={styles.heart} source={iconSave} />
              &nbsp;{text.noSavedEventsPart2}
            </Text>
            <ButtonPrimary
              onPress={this.eventList}
              testID="no-saved-events-button"
            >
              {text.noSavedEventsButton}
            </ButtonPrimary>
          </LayoutColumn>
        </ContentPadding>
      </ScrollView>
    );
  }
}

// Fix for Android rendering Image inline with Text.
const heartWidth = 24 * (Platform.OS === "ios" ? 1 : PixelRatio.get());
const heartHeight = 21 * (Platform.OS === "ios" ? 1 : PixelRatio.get());

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginBottom: 12
  },
  heart: {
    width: heartWidth,
    height: heartHeight
  },
  image: {
    alignSelf: "center"
  },
  title: {
    textAlign: "center"
  },
  infoText: {
    alignSelf: "center",
    maxWidth: 300,
    textAlign: "center",
    paddingBottom: 12 // 24px between button and content
  }
});

export default NoSavedEvents;
