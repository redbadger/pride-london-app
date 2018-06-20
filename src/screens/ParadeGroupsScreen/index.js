// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { ParadeGroup } from "./parade-group";
import type { State } from "../../reducers";
import Component from "./component";
import withIsFocused from "../../components/WithIsFocused";

type OwnProps = {
  isFocused: boolean
};

type Props = {
  paradeGroups: ParadeGroup[]
};

let cache: Props;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state: State, { isFocused }: OwnProps): Props => {
  if (!cache || isFocused) {
    cache = {
      paradeGroups: []
    };
  }
  return cache;
};

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

export const Container = connector(Component);

export default withIsFocused(Container);
