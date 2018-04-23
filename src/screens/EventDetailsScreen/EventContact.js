// @flow
import React from "react";
import { Image } from "react-native";
import { email as sendEmail, phonecall } from "react-native-communications";
import LayoutColumn from "../../components/LayoutColumn";
import Text from "../../components/Text";
import IconItem from "./IconItem";
import emailIcon from "../../../assets/images/email.png";
import callIcon from "../../../assets/images/call.png";
import text from "../../constants/text";
import TextLink from "./TextLink";

type Props = {
  email?: string,
  phone?: string
};

const EventContact = ({ email, phone }: Props) => (
  <LayoutColumn spacing={4}>
    <Text type="h2" color="lightNavyBlueColor">
      {text.eventDetailsContact}
    </Text>
    <LayoutColumn spacing={16}>
      {email && (
        <IconItem icon={<Image source={emailIcon} />}>
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
        <IconItem icon={<Image source={callIcon} />}>
          <TextLink onPress={() => phonecall(phone, false)}>{phone}</TextLink>
        </IconItem>
      )}
    </LayoutColumn>
  </LayoutColumn>
);

EventContact.defaultProps = {
  email: undefined,
  phone: undefined
};

export default EventContact;
