// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import Component from "./component";

type OwnProps = {};

type Props = {
  loading: boolean
} & OwnProps;

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
