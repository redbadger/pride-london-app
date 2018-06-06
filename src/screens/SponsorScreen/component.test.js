// @flow
import React from "react";
import { email } from "react-native-communications";
import { shallow } from "enzyme";
import Component from "./component";
import type { Sponsor } from "../../data/sponsor";
import text from "../../constants/text";
import Header from "../../components/Header";

jest.mock("react-native-communications", () => ({
  email: jest.fn(() => {})
}));

const generateSponsors = (count = 2): Sponsor[] =>
  Array.from(Array(count))
    .map(
      (_, i) =>
        ({
          contentType: "sponsor",
          locale: "en-GB",
          id: String(i + 1),
          fields: {
            sponsorName: `Sponsor ${i + 1}`,
            sponsorLogo: {
              sys: { id: `asset${i + 1}` }
            },
            sponsorUrl: "http://example.com",
            sponsorLevel: "Gold"
          },
          revision: 1
        }: Sponsor)
    )
    .reverse();

const navigation: any = {
  goBack: jest.fn()
};

beforeEach(() => {
  email.mockClear();
});

describe("SponsorScreen Component", () => {
  const render = props =>
    shallow(
      <Component
        navigation={navigation}
        sponsors={generateSponsors(2)}
        {...props}
      />
    );

  it("renders correctly", () => {
    const output = render();
    expect(output).toMatchSnapshot();
  });

  it("navigates back when user presses back button in toolbar", () => {
    const output = render();
    const header = output.find(Header).shallow();
    const backButton = header.find(Header.BackButton).shallow();
    const backFn = backButton.prop("onPress");
    backFn();
    expect(navigation.goBack).toHaveBeenCalledWith(null);
  });

  it("opens the configured email app on tap", () => {
    const output = render();

    output.find({ testID: "emailLauncher" }).simulate("press");
    expect(email).toBeCalledWith(
      ["sponsor@prideinlondon.org"],
      null,
      null,
      text.sponsorContactEmailSubject,
      null
    );
  });
});

afterEach(() => {
  navigation.goBack.mockClear();
});
