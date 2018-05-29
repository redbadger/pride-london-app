// @flow
import getAccessibilityLabel from "./accessibilityLabel.android";

const cases = [
  {
    name: "not focused, value",
    values: ["Company", undefined, "Aperture Science", false, undefined]
  },
  {
    name: "not focused, no value",
    values: ["Company", undefined, "", false, undefined]
  },
  {
    name: "focused, value",
    values: ["Company", undefined, "Aperture Science", true, undefined]
  },
  {
    name: "focused, no value",
    values: ["Company", undefined, "", true, undefined]
  }
];

cases.forEach(c => {
  it(`returns value TalkBack would say if: ${c.name}`, () => {
    const output = getAccessibilityLabel(...c.values);
    expect(output).toMatchSnapshot();
  });
});
