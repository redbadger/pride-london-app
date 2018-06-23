// @flow
import type { Node } from "react";
import { connect } from "react-redux";
import type { Connector } from "react-redux";

import type { State } from "../../reducers";
import hideSplashScreen from "../../actions/splash-screen";

import SplashScreen from "./component";

type OwnProps = {
  children: Node
};

type DispatchProps = {
  onAnimationComplete: () => any
};

type StateProps = OwnProps & {
  state: "showing" | "hiding" | "hidden"
};

export type SplashScreenProps = StateProps & DispatchProps;

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  ...ownProps,
  state: state.splashScreen
});

const mapDispatchToProps = {
  onAnimationComplete: hideSplashScreen
};

const connector: Connector<OwnProps, SplashScreenProps> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(SplashScreen);
