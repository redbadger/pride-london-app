// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import { selectDateFilter } from "../selectors/event-filters";
import type { Props as ComponentProps } from "./FilterHeader";
import Component from "./FilterHeader";

type OwnProps = {};
type Props = ComponentProps & OwnProps;

const mapStateToProps = state => ({
  dateFilter: selectDateFilter(state)
});

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
