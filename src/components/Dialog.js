// @flow
import React from "react";
import type { Node } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Text from "./Text";
import Touchable from "./Touchable";
import {
  dialogBackdropColor,
  dialogBgColor,
  dialogApplyButtonBgColor,
  dialogApplyButtonTextColor,
  dialogHeaderDividerColor,
  dialogTitleColor
} from "../constants/colors";

type Props = {
  applyButtonText: string,
  children: Node,
  headerLeft?: Node,
  headerRight?: Node,
  onApply: Function,
  onCancel?: Function,
  title: string,
  visible: boolean
};

const Dialog = ({
  applyButtonText,
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
    <TouchableWithoutFeedback style={styles.backdrop} onPress={onCancel}>
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={[styles.headerSide, styles.headerSideLeft]}>
                {headerLeft}
              </View>
              <Text type="h3" style={styles.headerTitle}>
                {title}
              </Text>
              <View style={[styles.headerSide, styles.headerSideRight]}>
                {headerRight}
              </View>
            </View>
            {children}
          </View>
        </TouchableWithoutFeedback>
        <Touchable onPress={onApply} style={styles.applyButton}>
          <Text type="h2" style={styles.applyButtonText}>
            {applyButtonText}
          </Text>
        </Touchable>
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
  headerSideRight: {
    alignItems: "flex-end"
  },
  headerTitle: {
    color: dialogTitleColor,
    alignSelf: "flex-end",
    marginBottom: 6
  },
  applyButton: {
    backgroundColor: dialogApplyButtonBgColor,
    borderRadius: 4,
    height: 48,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  applyButtonText: {
    color: dialogApplyButtonTextColor,
    lineHeight: 48
  }
});

export default Dialog;
