// @flow
import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import CheckBox from "./CheckBox";
import Text from "./Text";
import {
  cardBgColor,
  textColor,
  eventDetailsHeaderBgColor,
  eventListHeaderColor,
  dialogBackdropColor
} from "../constants/colors";

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
      <Modal
        animationType="fade"
        onRequestClose={this.props.onCancel}
        transparent
        visible={this.props.visible}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text type="h3" style={styles.headerTitle}>
                Select time
              </Text>
            </View>
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
          </View>
          <TouchableOpacity onPress={this.apply} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Show XX events</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height,
    padding: 16,
    backgroundColor: dialogBackdropColor
  },
  content: {
    backgroundColor: cardBgColor,
    borderRadius: 4,
    paddingBottom: 8
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: eventDetailsHeaderBgColor
  },
  headerTitle: {
    color: textColor
  },
  applyButton: {
    backgroundColor: eventListHeaderColor,
    borderRadius: 4,
    height: 48,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  applyButtonText: {
    color: cardBgColor
  }
});

export default TimesPickerDialog;
