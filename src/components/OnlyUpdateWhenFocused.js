// @flow
import { Component as ReactComponent } from "react";
import type { Node } from "react";
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

  shouldComponentUpdate() {
    return this.state.isFocused;
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

export default withNavigation(OnlyUpdateWhenFocusedComponent);
