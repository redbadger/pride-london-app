// @flow
import React, { Component as ReactComponent } from "react";
import type { ComponentType } from "react";
import type {
  NavigationEventSubscription,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

type State = {
  isFocused: boolean
};

// This component stops children from updating when the given navigation
// is not inFocus (I.e. not in the state between willFocus and blurred)
const withIsFocused = <A>(Component: ComponentType<A>) =>
  class OnlyUpdateWhenFocusedComponent extends ReactComponent<*, State> {
    subscriptions: Array<NavigationEventSubscription>;

    constructor(props: Props) {
      super(props);
      this.subscriptions = [];
      this.state = {
        isFocused: props.navigation ? props.navigation.isFocused() : false
      };
    }

    componentDidMount() {
      const { navigation } = this.props;

      this.subscriptions = [
        navigation.addListener("willFocus", () =>
          this.setState({ isFocused: true })
        ),
        navigation.addListener("willBlur", () =>
          this.setState({ isFocused: false })
        )
      ];
    }

    componentWillUnmount() {
      this.subscriptions.forEach(sub => sub.remove());
      this.subscriptions = [];
    }

    render() {
      return <Component isFocused={this.state.isFocused} {...this.props} />;
    }
  };

export default withIsFocused;
