// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet, Animated } from "react-native";
import type { LayoutEvent } from "react-native/Libraries/Types/CoreEventTypes";
import LinearGradient from "react-native-linear-gradient";
import { whiteZeroColor, whiteColor } from "../../constants/colors";
import text from "../../constants/text";
import type { Event } from "../../data/event";
import locale from "../../data/locale";
import Text from "../../components/Text";
import TextLink from "../../components/TextLink";
import EventMap from "./EventMap";

type Props = { event: Event };

const collapsedHeight = 100;
const collapsibleHeight = 140;

class EventDescription extends PureComponent<
  Props,
  { collapsed: boolean, textHeight: number }
> {
  state = {
    collapsed: true,
    textHeight: 0
  };

  componentWillMount() {
    this.textContainerHeight = new Animated.Value(Number(this.state.collapsed));
    this.gradientOpacity = new Animated.Value(Number(this.state.collapsed));
  }

  textContainerHeight: Object;
  gradientOpacity: Object;

  toggleCollapsed = () => {
    const newState = !this.state.collapsed;
    Animated.timing(this.textContainerHeight, {
      toValue: Number(newState),
      duration: this.state.textHeight * 0.8
    }).start(() => this.setState({ collapsed: newState }));
    Animated.timing(this.gradientOpacity, {
      toValue: Number(newState),
      duration: this.state.textHeight * 0.8,
      useNativeDriver: true
    }).start();
  };

  measureTextHeight = (event: LayoutEvent) =>
    this.setState({ textHeight: event.nativeEvent.layout.height });

  render() {
    const { event } = this.props;
    const { textHeight, collapsed } = this.state;
    const collapsible = textHeight > collapsibleHeight;
    const textContainerHeightStyle = {
      height: this.textContainerHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [textHeight, collapsible ? collapsedHeight : textHeight]
      })
    };
    const gradientOpacityStyle = {
      opacity: this.gradientOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    return (
      <View>
        <Text type="h2" color="lightNavyBlueColor" style={styles.title}>
          {text.eventDetailsAbout}
        </Text>
        <View>
          <Animated.ScrollView
            style={textContainerHeightStyle}
            scrollEnabled={false}
          >
            <Text markdown onLayout={this.measureTextHeight}>
              {event.fields.eventDescription[locale]}
            </Text>
          </Animated.ScrollView>
          {collapsible && (
            <Animated.View style={[styles.gradient, gradientOpacityStyle]}>
              <LinearGradient
                colors={[whiteZeroColor, whiteColor]}
                style={styles.gradient}
              />
            </Animated.View>
          )}
        </View>
        {collapsible && (
          <TextLink
            onPress={this.toggleCollapsed}
            style={styles.toggleContainer}
          >
            {collapsed ? text.eventDetailsReadMore : text.eventDetailsReadLess}
          </TextLink>
        )}
        <View style={styles.mapWrapper}>
          <EventMap
            lat={event.fields.location[locale].lat}
            lon={event.fields.location[locale].lon}
            locationName={event.fields.locationName[locale]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 8,
    marginBottom: 4
  },
  gradient: {
    width: "100%",
    height: 30,
    position: "absolute",
    bottom: 0
  },
  toggleContainer: {
    alignSelf: "flex-end"
  },
  mapWrapper: {
    marginTop: 8
  }
});

export default EventDescription;
