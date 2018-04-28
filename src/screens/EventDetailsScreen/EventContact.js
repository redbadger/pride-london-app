// @flow
import React from "react";
import { email as sendEmail, phonecall } from "react-native-communications";
import LayoutColumn from "../../components/LayoutColumn";
import Text from "../../components/Text";
import IconItem from "./IconItem";
import IconList from "./IconList";
import emailIcon from "../../../assets/images/email.png";
import callIcon from "../../../assets/images/call.png";
import text from "../../constants/text";
import TextLink from "../../components/TextLink";

type Props = {
  email?: string,
  phone?: string
};

const EventContact = ({ email, phone }: Props) => (
  <LayoutColumn spacing={4}>
    <Text type="h2" color="lightNavyBlueColor">
      {text.eventDetailsContact}
    </Text>
    <IconList>
      {email && (
        <IconItem
          onPress={() =>
            sendEmail(
              [email],
              null,
              null,
              text.eventDetailsContactEmailSubject,
              text.eventDetailsContactEmailBody
            )
          }
          source={emailIcon}
        >
          <TextLink>{email}</TextLink>
        </IconItem>
      )}
      {phone && (
        <IconItem onPress={() => phonecall(phone, false)} source={callIcon}>
          <TextLink>{phone}</TextLink>
        </IconItem>
      )}
    </IconList>
  </LayoutColumn>
);

EventContact.defaultProps = {
  email: undefined,
  phone: undefined
};

export default EventContact;
