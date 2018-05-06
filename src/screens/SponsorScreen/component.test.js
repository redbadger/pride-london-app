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
          sys: {
            id: String(i + 1)
          },
          fields: {
            sponsorName: {
              "en-GB": `Sponsor ${i + 1}`
            },
            sponsorLogo: {
              "en-GB": {
                sys: {
                  id: `asset${i + 1}`
                }
              }
            },
            sponsorUrl: {
              "en-GB": "http://example.com"
            },
            sponsorLevel: {
              "en-GB": "Gold"
            }
          }
        }: any)
    )
    .reverse();

const getAssetSource = jest.fn().mockReturnValue({
  uri: "http://example.com/image.png",
  width: 1,
  height: 1
});
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
        getAssetSource={getAssetSource}
        {...props}
      />
    );

  it("renders correctly", () => {
    const output = render();
    expect(output).toMatchSnapshot();
  });

  it("navigates back when user presses back button in toolbar", () => {
    const output = render();
    const backFn = output.find(Header).prop("onBack");
    backFn("press");
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
  getAssetSource.mockClear();
  navigation.goBack.mockClear();
});
