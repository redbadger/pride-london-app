// @flow
import React from "react";
import CheckBox from "./CheckBox";
import Dialog from "./Dialog";

type Props = {
  onTimesSelected: Function,
  onCancel: Function,
  visible: boolean
};

type State = {
  morning: boolean,
  afternoon: boolean,
  evening: boolean
};

class TimesPickerDialog extends React.PureComponent<Props, State> {
  state = {
    morning: true,
    afternoon: true,
    evening: true
  };

  toggleMorning = () => {
    this.setState({ morning: !this.state.morning });
  };

  toggleAfternoon = () => {
    this.setState({ afternoon: !this.state.afternoon });
  };

  toggleEvening = () => {
    this.setState({ evening: !this.state.evening });
  };

  apply = () => {
    const times = [];
    if (this.state.morning) {
      times.push("Morning");
    }

    if (this.state.afternoon) {
      times.push("Afternoon");
    }

    if (this.state.evening) {
      times.push("Evening");
    }

    if (times.length > 0) {
      this.props.onTimesSelected(times);
    }
  };

  render() {
    return (
      <Dialog
        applyButtonText="Show XX events"
        onApply={this.apply}
        onCancel={this.props.onCancel}
        title="Select time"
        visible={this.props.visible}
      >
        <CheckBox
          onChange={this.toggleMorning}
          checked={this.state.morning}
          label="Morning"
        />
        <CheckBox
          onChange={this.toggleAfternoon}
          checked={this.state.afternoon}
          label="Afternoon"
        />
        <CheckBox
          onChange={this.toggleEvening}
          checked={this.state.evening}
          label="Evening"
        />
      </Dialog>
    );
  }
}

export default TimesPickerDialog;
