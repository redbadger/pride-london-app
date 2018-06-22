// @flow
import React, { PureComponent } from "react";
import type { ElementRef } from "react";
import { Animated, Easing, Linking, StyleSheet, View } from "react-native";
import type { ParadeGroup } from "../../data/parade-group";
import Text from "../../components/Text";
import TextLink from "../../components/TextLink";
import Touchable from "../../components/Touchable";
import text from "../../constants/text";
import chevron from "../../../assets/images/chevronRightGreen.png";

type Props = {
  paradeGroup: ParadeGroup
};

type State = {
  animation: Object,
  collapsed: boolean,
  contentHeight: number
};

const renderURL = (label, url) => (
  <Touchable onPress={() => Linking.openURL(url)}>
    <TextLink>{label}</TextLink>
  </Touchable>
);

const spinInterpolation = {
  inputRange: [0, 1],
  outputRange: ["90deg", "-90deg"]
};

class ParadeGroupDetails extends PureComponent<Props, State> {
  constructor() {
    super();
    // $FlowFixMe: For some reason flow doesn't know about React.createRef.
    this.collapsable = React.createRef();
  }

  state = {
    animation: new Animated.Value(0),
    collapsed: true,
    contentHeight: 0
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.collapsed === this.state.collapsed) return;

    const toValue = this.state.collapsed ? 0 : 1;
    const { animation } = this.state;

    Animated.timing(animation, {
      toValue,
      duration: 200,
      easing: Easing.ease
    }).start();
  }

  collapsable: ElementRef<typeof View>;

  toggleCollapse = () => {
    if (this.collapsable.current && this.state.collapsed) {
      this.collapsable.current.measure((a, b, width, height) => {
        this.setState({
          collapsed: !this.state.collapsed,
          contentHeight: height
        });
      });
    } else {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }
  };

  render() {
    const {
      name,
      section,
      facebookUrl,
      twitterUrl,
      websiteUrl
    } = this.props.paradeGroup.fields;
    const { animation, collapsed, contentHeight } = this.state;
    const spin = animation.interpolate(spinInterpolation);
    const height = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [4, contentHeight] // must have some height when collapsed to be able to measure correctly.
    });
    return (
      <View style={styles.container}>
        <Touchable
          accessibilityLabel={
            collapsed
              ? text.paradeGroups.expandAccessibilityLabel
              : text.paradeGroups.collapseAccessibilityLabel
          }
          onPress={this.toggleCollapse}
          style={styles.collapseButton}
        >
          <Animated.Image
            style={[styles.chevron, { transform: [{ rotate: spin }] }]}
            source={chevron}
          />
        </Touchable>
        <View style={styles.details}>
          <Text type="h4">{name}</Text>
          <Animated.View style={[styles.animatedContainer, { height }]}>
            <View style={styles.collapsable} ref={this.collapsable}>
              <Text style={styles.section}>{section}</Text>
              {facebookUrl &&
                renderURL(text.paradeGroups.linkLabelFacebook, facebookUrl)}
              {twitterUrl &&
                renderURL(text.paradeGroups.linkLabelTwitter, twitterUrl)}
              {websiteUrl &&
                renderURL(text.paradeGroups.linkLabelWebsite, websiteUrl)}
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  chevron: {
    width: 24,
    height: 24
  },
  collapseButton: {},
  details: {
    flex: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 10
  },
  animatedContainer: {
    overflow: "hidden"
  },
  collapsable: {
    minHeight: 32 // required to stop text from collapsing
  },
  section: {
    paddingTop: 8
  }
});

export default ParadeGroupDetails;
