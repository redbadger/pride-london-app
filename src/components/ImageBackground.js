// @flow
import React, { Component } from "react";
import { ImageBackground as RNImageBackground } from "react-native";
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { ImageDetails } from "../data/image";
import { getImageDetails as createImageDetailsGetter } from "../data/image";
import type { FieldRef } from "../data/field-ref";

type OwnProps = {
  reference: FieldRef
};

type StateProps = {
  getImageDetails: string => ?ImageDetails
};

type Props = OwnProps & StateProps;

/*export const ImageBackground = ({
  reference,
  getImageDetails,
  ...props
}: Props) => {

};*/

class ImageBackground extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { imageSize: null };
  }

  render() {
    const { reference, getImageDetails, ...props } = this.props;

    const imageNotLoadedPlaceholder = {
      uri:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5/hPwAIAgL/4d1j8wAAAABJRU5ErkJggg=="
    };
    const imgSrc = this.state.imageSize
      ? getImageDetails(reference.sys.id, {
          width: this.state.imageSize.width,
          height: this.state.imageSize.height
        })
      : imageNotLoadedPlaceholder;
    return (
      <RNImageBackground
        onLayout={({
          nativeEvent: {
            layout: { width, height }
          }
        }) => {
          console.log(this.state.imageSize);
          this.setState({ imageSize: { width, height } });
        }}
        source={imgSrc}
        {...props}
      />
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
