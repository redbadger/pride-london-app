// @flow
import React, { Component } from "react";
import { Image, View } from "react-native";

type Props = {
  ratio: Number,
  source: Image.Props.source
};

class ImageWithAspect extends Component<Props> {
  constructor() {
    super();
    this.state = {
      height: 0
    };
  }
  handleLayout = event => {
    this.setState({
      height: event.nativeEvent.layout.width / this.props.ratio
    });
  };

  render() {
    return (
      <View onLayout={this.handleLayout}>
        <Image
          source={this.props.source}
          style={{
            height: this.state.height
          }}
          resizeMode="cover"
        />
      </View>
    );
  }
}

export default ImageWithAspect;
