// @flow
import React from "react";
import type { Node } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Button from "./ButtonPrimary";
import {
  dialogBackdropColor,
  dialogBgColor,
  dialogHeaderDividerColor
} from "../constants/colors";

type Props = {
  applyButtonText: string,
  applyButtonLabel: string,
  children: Node,
  headerLeft?: Node,
  headerRight?: Node,
  onApply: Function,
  onCancel?: Function,
  title: Node,
  visible: boolean
};

const Dialog = ({
  applyButtonText,
  applyButtonLabel,
  children,
  headerLeft,
  headerRight,
  onApply,
  onCancel,
  title,
  visible
}: Props) => (
  <Modal
    animationType="fade"
    onRequestClose={onCancel}
    transparent
    visible={visible}
  >
    <TouchableWithoutFeedback
      style={styles.backdrop}
      onPress={onCancel}
      accessible={false}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback accessible={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={[styles.headerSide, styles.headerSideLeft]}>
                {headerLeft}
              </View>
              <View style={[styles.headerSide, styles.headerSideMiddle]}>
                {title}
              </View>
              <View style={[styles.headerSide, styles.headerSideRight]}>
                {headerRight}
              </View>
            </View>
            {children}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.applyButtonContainer}>
          <Button onPress={onApply} accessibilityLabel={applyButtonLabel}>
            {applyButtonText}
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

Dialog.defaultProps = {
  headerLeft: undefined,
  headerRight: undefined,
  onCancel: () => {}
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: dialogBackdropColor
  },
  content: {
    backgroundColor: dialogBgColor,
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
    borderBottomColor: dialogHeaderDividerColor
  },
  headerSide: {
    width: 0,
    flexGrow: 1
  },
  headerSideLeft: {
    alignItems: "flex-start"
  },
  headerSideMiddle: {
    alignItems: "center"
  },
  headerSideRight: {
    alignItems: "flex-end"
  },
  applyButtonContainer: {
    marginTop: 8
  }
});

export default Dialog;
