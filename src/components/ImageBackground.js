// @flow
import React, { Component } from "react";
import { ImageBackground as RNImageBackground } from "react-native";
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { LayoutEvent } from "react-native/Libraries/Types/CoreEventTypes";
import type { ImageDetails } from "../data/image";
import { getImageDetails as createImageDetailsGetter } from "../data/image";
import type { FieldRef } from "../data/field-ref";

type OwnProps = {
  reference: FieldRef
};

type State = {
  imageSize: ?{ width: number, height: number }
};

type StateProps = {
  getImageDetails: (string, { width: number, height: number }) => ?ImageDetails
};

type Props = OwnProps & StateProps;

export class ImageBackground extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { imageSize: null };
  }

  onLayout = (event: LayoutEvent) => {
    this.setState({
      imageSize: {
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height
      }
    });
  };

  render() {
    const { reference, getImageDetails, ...props } = this.props;

    // Single transparent pixel rendered initally so image size can be measured
    const imageNotLoadedPlaceholder = {
      uri:
        "data:image/png;base64,  iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    };

    const imgSrc = this.state.imageSize
      ? getImageDetails(reference.sys.id, {
          width: this.state.imageSize.width,
          height: this.state.imageSize.height
        })
      : imageNotLoadedPlaceholder;

    return (
      <RNImageBackground onLayout={this.onLayout} source={imgSrc} {...props} />
    );
  }
}

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state, ownProps: OwnProps): Props => ({
  getImageDetails: createImageDetailsGetter(state.data.images),
  ...ownProps
});

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

const ConnectedImageBackground = connector(ImageBackground);

export default ConnectedImageBackground;
