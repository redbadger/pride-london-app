// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { lightNavyBlueColor } from "../../constants/colors";
import Header from "./Header";
import DateRangePicker from "../EventsScreen/DateRangePicker";
import Button from "../../components/ButtonPrimary";

type Props = {
  applyButtonText: string,
  applyButtonLabel: string,
  applyButtonDisabled?: boolean,
  dateRange: ?DateRange,
  onApply: () => void,
  onCancel: () => void,
  onChange: (?DateRange) => void,
  forceNewRange: boolean,
  navigation: any
};

class DateFilterScreen extends PureComponent<Props> {
  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {
      onChange,
      dateRange,
      forceNewRange,
      applyButtonDisabled,
      onApply,
      onCancel,
      applyButtonLabel,
      applyButtonText
    } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <Header onBack={this.goBack} onCancel={onCancel} />
        <View style={styles.list}>
          <DateRangePicker
            onChange={onChange}
            dateRange={dateRange}
            forceNewRange={forceNewRange}
          />
          <Button
            disabled={applyButtonDisabled}
            onPress={onApply}
            accessibilityLabel={applyButtonLabel}
          >
            {applyButtonText}
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: lightNavyBlueColor
  }
});

export default DateFilterScreen;
