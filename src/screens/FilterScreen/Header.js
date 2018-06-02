// @flow
import React from "react";
import ActionButton from "../../components/ActionButton";
import GlobalHeader from "../../components/Header";
import text from "../../constants/text";

type Props = {
  onClearPress: () => void,
  onBackPress: () => void,
  showClear: boolean
};

const Header = ({ onClearPress, onBackPress, showClear }: Props) => {
  const clearElement = showClear ? (
    <ActionButton label={text.reset} onPress={onClearPress} />
  ) : null;
  return (
    <GlobalHeader
      leftElement={<GlobalHeader.BackButton onPress={onBackPress} />}
      title={text.filterEvents}
      rightElement={clearElement}
    />
  );
};

export default Header;
