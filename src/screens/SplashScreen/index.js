// @flow
import type { Node } from "react";
import { connect } from "react-redux";
import type { Connector } from "react-redux";

import type { State } from "../../reducers";
import hideSplashScreen from "../../actions/splash-screen";
import { getData } from "../../actions/data";

import SplashScreen from "./component";

type OwnProps = {
  children: Node
};

type DispatchProps = {
  onAnimationComplete: () => any,
  getData: () => any
};

type StateProps = OwnProps & {
  state: "showing" | "hiding" | "hidden",
  noDataReceived: boolean,
  loading: boolean
};

export type SplashScreenProps = StateProps & DispatchProps;

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  ...ownProps,
  state: state.splashScreen,
  noDataReceived: state.data.noDataReceived,
  loading: state.data.loading
});

const mapDispatchToProps = {
  onAnimationComplete: hideSplashScreen,
  getData
};

const connector: Connector<OwnProps, SplashScreenProps> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(SplashScreen);
