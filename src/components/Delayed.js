// @flow
import React, { Component } from "react";
import { View } from "react-native";
import type { Node } from "react";

type Props = { delay: number, children: Node };
class Delayed extends Component<Props, { ready: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { ready: true };
  }

  componentWillMount() {
    const { delay } = this.props;
    if (delay && delay > 0) {
      this.setState({ ready: false });
      this.timeout = setTimeout(() => this.setState({ ready: true }), delay);
    } else {
      this.setState({ ready: true });
    }
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  timeout: any;

  render() {
    const { children } = this.props;
    const { ready } = this.state;
    return ready && <View>{children}</View>;
  }
}

export default Delayed;
