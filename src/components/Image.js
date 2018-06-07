// @flow
import React from "react";
import { Image as RNImage } from "react-native";
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

export const Image = ({ reference, getImageDetails, ...props }: Props) => (
  <RNImage source={getImageDetails(reference.sys.id)} {...props} />
);

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state, ownProps: OwnProps): Props => ({
  getImageDetails: createImageDetailsGetter(state.data.images),
  ...ownProps
});

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

const ConnectedImage = connector(Image);

export default ConnectedImage;
