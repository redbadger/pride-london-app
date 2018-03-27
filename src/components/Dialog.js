// @flow
import React from "react";
import type { Node } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Text from "./Text";
import Touchable from "./Touchable";
import {
  dialogBackdropColor,
  dialogBgColor,
  dialogApplyButtonBgColor,
  dialogApplyButtonTextColor,
  dialogHeaderDividerColor,
  textColor
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
    <View style={styles.container}>
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
      <Touchable onPress={onApply} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>{applyButtonText}</Text>
      </Touchable>
    </View>
  </Modal>
);

Dialog.defaultProps = {
  headerLeft: undefined,
  headerRight: undefined,
  onCancel: () => {}
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
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
    color: textColor
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
    color: dialogApplyButtonTextColor
  }
});

export default Dialog;
