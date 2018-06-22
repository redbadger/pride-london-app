// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { State } from "../../reducers";
import withIsFocused from "../../components/WithIsFocused";
import Component from "./component";
import type { Event } from "../../data/event";
import { selectStages } from "../../selectors";
import { networkInterfaces } from "os";

type OwnProps = {
  isFocused: boolean
};

type StateProps = {
  stages: Event[],
  isFocused: boolean
};

let cache: StateProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state: State, { isFocused }: OwnProps): StateProps => {
  if (!cache || isFocused) {
    cache = {
      stages: selectStages(state),
      isFocused
    };
  }
  return cache;
};

const connector: Connector<OwnProps, StateProps> = connect(mapStateToProps);

export const Container = connector(Component);

export default withIsFocused(Container);
