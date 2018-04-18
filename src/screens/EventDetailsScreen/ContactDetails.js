// @flow
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Text from "../../components/Text";
import IconItem from "./IconItem";
import emailIcon from "../../../assets/images/email.png";
import callIcon from "../../../assets/images/call.png";
import text from "../../constants/text";
import TextLink from "../../components/TextLink";

type Props = {
  email: string,
  phone: string
};

const ContactDetails = ({ email, phone }: Props) => (
  <View>
    <Text type="h2" blue>
      {text.eventDetailsContact}
    </Text>
    {email && (
      <View style={styles.contactItem}>
        <IconItem icon={<Image source={emailIcon} />}>
          <TextLink>{email}</TextLink>
        </IconItem>
      </View>
    )}
    {phone && (
      <View style={styles.contactItem}>
        <IconItem icon={<Image source={callIcon} />}>
          <TextLink>{phone}</TextLink>
        </IconItem>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  contactItem: {
    marginTop: 16
  }
});

export default ContactDetails;
