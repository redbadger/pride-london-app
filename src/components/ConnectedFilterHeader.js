// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import { selectDateFilter, selectTimeFilter } from "../selectors/event-filters";
import Component from "./FilterHeader";
import type { Props as ComponentProps } from "./FilterHeader";

type OwnProps = {};

type Props = ComponentProps & OwnProps;

const mapStateToProps = state => ({
  dateFilter: selectDateFilter(state),
  timeFilter: selectTimeFilter(state)
});

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
