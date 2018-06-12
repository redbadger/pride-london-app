// @flow
import React, { Component as ReactComponent } from "react";
import type { ComponentType, Node } from "react";
import { withNavigation } from "react-navigation";
import type {
  NavigationEventSubscription,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  children: Node
};

type State = {
  isFocused: boolean
};

// This component stops children from updating when the given navigation
// is not inFocus (I.e. not in the state between willFocus and blurred)
export class OnlyUpdateWhenFocusedComponent extends ReactComponent<
  Props,
  State
> {
  subscriptions: Array<NavigationEventSubscription>;

  constructor(props: Props) {
    super(props);
    this.subscriptions = [];
    this.state = {
      isFocused: props.navigation ? props.navigation.isFocused() : false
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextState.isFocused;
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
    return this.props.children;
  }
}

const OnlyUpdateWhenFocused = withNavigation(OnlyUpdateWhenFocusedComponent);

const onlyUpdateWhenFocused = <A>(
  Component: ComponentType<A>
): (A => Node) => props => (
  <OnlyUpdateWhenFocused>
    <Component {...props} />
  </OnlyUpdateWhenFocused>
);

export default onlyUpdateWhenFocused;
