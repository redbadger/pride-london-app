// @flow
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { email as sendEmail, phonecall } from "react-native-communications";
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
    <Text type="h2" color="lightNavyBlueColor" style={styles.title}>
      {text.eventDetailsContact}
    </Text>
    {email && (
      <View style={styles.contactItem}>
        <IconItem icon={<Image source={emailIcon} style={styles.mailIcon} />}>
          <TextLink
            onPress={() =>
              sendEmail(
                [email],
                null,
                null,
                text.eventDetailsContactEmailSubject,
                text.eventDetailsContactEmailBody
              )
            }
          >
            {email}
          </TextLink>
        </IconItem>
      </View>
    )}
    {phone && (
      <View style={styles.contactItem}>
        <IconItem icon={<Image source={callIcon} style={styles.phoneIcon} />}>
          <TextLink onPress={() => phonecall(phone, false)}>{phone}</TextLink>
        </IconItem>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  title: {
    marginTop: 8,
    marginBottom: 4
  },
  mailIcon: {
    marginTop: 7
  },
  phoneIcon: {
    marginTop: 6,
    marginLeft: 2
  },
  contactItem: {
    marginBottom: 8
  }
});

export default ContactDetails;
