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
import Touchable from "../../components/Touchable";

type Props = {
  email: string,
  phone: string
};

const ContactDetails = ({ email, phone }: Props) => (
  <View>
    <Text type="h2" color="blue">
      {text.eventDetailsContact}
    </Text>
    {email && (
      <View style={styles.contactItem}>
        <IconItem icon={<Image source={emailIcon} />}>
          <Touchable
            onPress={() =>
              sendEmail(
                [email],
                null,
                null,
                text.eventDetailsContactEmailSubject,
                text.eventeventDetailsContactEmailBody
              )
            }
          >
            <TextLink>{email}</TextLink>
          </Touchable>
        </IconItem>
      </View>
    )}
    {phone && (
      <View style={styles.contactItem}>
        <Touchable onPress={() => phonecall(phone, false)}>
          <IconItem icon={<Image source={callIcon} />}>
            <TextLink>{phone}</TextLink>
          </IconItem>
        </Touchable>
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
