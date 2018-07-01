// @flow
import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import Text from "../../components/Text";
import Button from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";

import { whiteColor, eucalyptusGreenColor } from "../../constants/colors";
import text from "../../constants/text";

type State = {
  retrying: boolean
};

type Props = {
  loading: boolean,
  getData: () => void
};

class BadConnection extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      retrying: false
    };
  }

  componentWillReceiveProps({ loading }: Props) {
    if (!loading) {
      this.setState({ retrying: false });
    }
  }

  retryDataFetch = () => {
    this.setState({ retrying: true });
    this.props.getData();
  };

  render() {
    const { retrying } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text type="h1" style={styles.title}>
            {text.badConnection.title}
          </Text>
        </View>
        <View style={styles.messageContainer}>
          <Text type="h2" style={styles.message}>
            {text.badConnection.message}
          </Text>
        </View>

        <ContentPadding style={styles.buttonContainer}>
          {!retrying && (
            <Button onPress={this.retryDataFetch}>
              {text.badConnection.button}
            </Button>
          )}
          {retrying && (
            <ActivityIndicator size="large" color={eucalyptusGreenColor} />
          )}
        </ContentPadding>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "10%"
  },
  title: {
    color: whiteColor,
    textAlign: "center"
  },
  message: {
    color: whiteColor,
    textAlign: "center",
    padding: 20
  },
  messageContainer: {},
  buttonContainer: {
    alignSelf: "stretch",
    minHeight: 48
  }
});

export default BadConnection;
