// @flow
import React from "react";
import { Image, StyleSheet } from "react-native";
import { email as sendEmail, phonecall } from "react-native-communications";
import LayoutColumn from "../../components/LayoutColumn";
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
  <LayoutColumn spacing={4}>
    <Text type="h2" color="lightNavyBlueColor">
      {text.eventDetailsContact}
    </Text>
    <LayoutColumn spacing={8}>
      {email && (
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
      )}
      {phone && (
        <IconItem icon={<Image source={callIcon} style={styles.phoneIcon} />}>
          <TextLink onPress={() => phonecall(phone, false)}>{phone}</TextLink>
        </IconItem>
      )}
    </LayoutColumn>
  </LayoutColumn>
);

const styles = StyleSheet.create({
  mailIcon: {
    marginTop: 7
  },
  phoneIcon: {
    marginTop: 6,
    marginLeft: 2
  }
});

export default ContactDetails;
