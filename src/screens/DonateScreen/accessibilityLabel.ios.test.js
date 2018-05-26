// @flow
import getAccessibilityLabel from "./accessibilityLabel.ios";

const cases = [
  {
    name: "not focused, placeholder, value",
    values: ["Company", "Your company", "Aperture Science", false, undefined]
  },
  {
    name: "not focused, placeholder, no value",
    values: ["Company", "Your company", "", false, undefined]
  },
  {
    name: "not focused, no placeholder, no value",
    values: ["Company", undefined, "", false, undefined]
  },
  {
    name: "focused, placeholder, value, no selection",
    values: ["Company", "Your company", "Aperture Science", true, undefined]
  },
  {
    name: "focused, placeholder, no value, selection at start",
    values: ["Company", "Your company", "", true, { start: 0, end: 0 }]
  },
  {
    name: "focused, no placeholder, no value, selection at end",
    values: ["Company", undefined, "", true, { start: 7, end: 7 }]
  }
];

cases.forEach(c => {
  it(`returns value VoiceOver would say if: ${c.name}`, () => {
    const output = getAccessibilityLabel(...c.values);
    expect(output).toMatchSnapshot();
  });
});
