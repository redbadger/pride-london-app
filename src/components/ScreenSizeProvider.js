// @flow
import React from "react";
import type { Node } from "react";
import { Dimensions } from "react-native";

export type ScreenSize = "small" | "medium" | "large";

type Props = {
  children: (size: ScreenSize) => Node
};

type State = {
  size: ScreenSize
};

const getScreenSize = (): ScreenSize => {
  const { width } = Dimensions.get("window");
  if (width >= 440) {
    return "large";
  } else if (width >= 360) {
    return "medium";
  }

  return "small";
};

class ScreenSizeProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { size: getScreenSize() };
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this.updateSize);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateSize);
  }

  updateSize = () => {
    this.setState({
      size: getScreenSize()
    });
  };

  render() {
    return this.props.children(this.state.size);
  }
}

export default ScreenSizeProvider;
