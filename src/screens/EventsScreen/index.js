import { connect } from "react-redux";
import { updateEvents } from "../../actions";
import Component from "./component";

const mapStateToProps = state => ({
  events: state.events,
  loaded: !state.loading,
  refreshing: state.refreshing
});

const mapDispatchToProps = () => ({
  updateEvents
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
