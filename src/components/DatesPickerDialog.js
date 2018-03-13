// @flow
import React from "react";
import type { Node } from "react";
import {
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Text from "./Text";
import {
  eventDetailsHeaderBgColor,
  textColor,
  textColorDisabled
} from "../constants/colors";

LocaleConfig.locales[""] = {
  ...LocaleConfig.locales[""],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"]
};

type HeaderButtonProps = {
  children: Node,
  disabled?: boolean,
  onPress: Function
};

const HeaderButton = ({ children, disabled, onPress }: HeaderButtonProps) => (
  <TouchableOpacity disabled={disabled} onPress={onPress}>
    <Text
      style={[styles.headerButton, disabled && styles.headerButtonDisabled]}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

HeaderButton.defaultProps = {
  disabled: false
};

type CalendarDay = {
  year: number,
  month: number,
  day: number,
  timestamp: number,
  dateString: string
};

type Props = {
  onDatesSelected: Function,
  onCancel: Function,
  visible: boolean
};

type State = {
  startDate?: string
};

class DatesPickerDialog extends React.PureComponent<Props, State> {
  state = {};

  onDaySelected = (day: CalendarDay) => {
    this.setState({ startDate: day.dateString });
  };

  onApply = () => {
    if (this.state.startDate) {
      this.props.onDatesSelected(new Date(this.state.startDate));
    }
  };

  render() {
    const markedDates = {};
    if (this.state.startDate) {
      markedDates[this.state.startDate] = {
        selected: true,
        selectedColor: "rgb(51, 51, 51)"
      };
    }

    return (
      <Modal
        animationType="slide"
        onRequestClose={this.props.onCancel}
        presentationStyle="fullScreen"
        visible={this.props.visible}
      >
        <SafeAreaView style={styles.headerContainer}>
          <StatusBar barStyle="default" animated />
          <View style={styles.header}>
            <HeaderButton onPress={this.props.onCancel}>Cancel</HeaderButton>
            <Text type="h2" style={styles.headerTitle}>
              Choose Dates
            </Text>
            <HeaderButton
              onPress={this.onApply}
              disabled={!this.state.startDate}
            >
              Apply
            </HeaderButton>
          </View>
        </SafeAreaView>
        <Calendar
          markedDates={markedDates}
          onDayPress={this.onDaySelected}
          theme={{
            textDayFontFamily: "Roboto",
            textMonthFontFamily: "Roboto",
            textDayHeaderFontFamily: "Roboto",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: eventDetailsHeaderBgColor
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16
  },
  headerButton: {
    flex: 0,
    color: textColor
  },
  headerButtonDisabled: {
    color: textColorDisabled
  },
  headerTitle: {
    color: textColor
  }
});

export default DatesPickerDialog;
