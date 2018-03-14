// @flow
import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Calendar } from "react-native-calendars";
import formatDate from "date-fns/format";
import addDays from "date-fns/add_days";
import Text from "./Text";
import {
  cardBgColor,
  textColor,
  eventDetailsHeaderBgColor,
  eventListHeaderColor,
  dialogBackdropColor
} from "../constants/colors";

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
  startDate?: string,
  endDate?: string
};

class DatesPickerDialog extends React.PureComponent<Props, State> {
  state = {};

  onDaySelected = (day: CalendarDay) => {
    if (!this.state.startDate) {
      this.setState({ startDate: day.dateString });
    } else {
      this.setState({ endDate: day.dateString });
    }
  };

  clear = () => {
    this.setState({
      startDate: undefined,
      endDate: undefined
    });
  };

  apply = () => {
    this.props.onDatesSelected(
      this.state.startDate && new Date(this.state.startDate),
      this.state.endDate && new Date(this.state.endDate)
    );
  };

  render() {
    const { startDate, endDate } = this.state;

    const title = startDate
      ? `${formatDate(startDate, "D MMM")} - ${
          endDate ? formatDate(endDate, "D MMM") : ""
        }`
      : "Select dates";

    const markedDates = {};
    let markingType = "simple";
    if (startDate && endDate) {
      markingType = "period";
      const template = {
        color: eventListHeaderColor,
        textColor: cardBgColor
      };

      // Start
      markedDates[startDate] = {
        ...template,
        startingDay: true
      };

      // In between
      let inBetweenDate = startDate;
      do {
        inBetweenDate = formatDate(addDays(inBetweenDate, 1), "YYYY-MM-DD");
        markedDates[inBetweenDate] = { ...template };
      } while (inBetweenDate !== endDate);

      // End
      markedDates[endDate] = {
        ...template,
        endingDay: true
      };
    } else if (startDate) {
      markedDates[startDate] = {
        selected: true,
        selectedColor: eventListHeaderColor
      };
    }

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
              <View style={styles.headerSide} />
              <Text type="h3" style={styles.headerTitle}>
                {title}
              </Text>
              <View style={styles.headerSide}>
                <TouchableOpacity
                  onPress={this.clear}
                  style={styles.cancelButton}
                >
                  <Text>Clear</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Calendar
              markedDates={markedDates}
              markingType={markingType}
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
    justifyContent: "space-between",
    height: 40,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: eventDetailsHeaderBgColor
  },
  headerSide: {
    width: 0,
    flexGrow: 1
  },
  headerTitle: {
    color: textColor
  },
  cancelButton: {
    alignSelf: "flex-end"
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

export default DatesPickerDialog;
