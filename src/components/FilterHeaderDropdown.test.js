// @flow
import React from "react";
import { shallow } from "enzyme";
import FilterHeaderButton from "./FilterHeaderButton";
import FilterHeaderDropdown from "./FilterHeaderDropdown";
import showPopupMenu from "./showPopupMenu";

jest.mock("./showPopupMenu");

const untypedShowPopupMenu: any = showPopupMenu;
const options = ["Apple", "Bananas", "Kiwi"];

it("renders correctly", () => {
  const style = { marginTop: 16 };
  const output = shallow(
    <FilterHeaderDropdown
      options={options}
      onChange={() => {}}
      style={style}
      value="Apple"
    />
  );
  expect(output).toMatchSnapshot();
});

it("shows popup menu on press", async () => {
  const onChange = jest.fn();
  const output = shallow(
    <FilterHeaderDropdown options={options} onChange={onChange} value="Apple" />
  );

  // Simulate ref (should then be passed to showPopupMenu)
  const onRef = output.find(FilterHeaderButton).prop("onRef");
  const nodeRef = {};
  onRef(nodeRef);

  // Open popup menu and select "Bananas"
  untypedShowPopupMenu.mockResolvedValue("Bananas");
  output.simulate("press");
  expect(untypedShowPopupMenu).toHaveBeenCalledWith(options, nodeRef);

  // Validate onChange called
  await new Promise(resolve => setTimeout(resolve));
  expect(onChange).toHaveBeenCalledWith("Bananas");
});

it("shows popup menu on press (popup dismissed)", async () => {
  const onChange = jest.fn();
  const output = shallow(
    <FilterHeaderDropdown options={options} onChange={onChange} value="Apple" />
  );

  // Open popup menu and dismiss it (return undefined)
  output.simulate("press");
  expect(untypedShowPopupMenu).toHaveBeenCalledWith(options, null);

  // Validate state not changed
  await new Promise(resolve => setTimeout(resolve));
  expect(onChange).not.toHaveBeenCalled();
});

afterEach(() => {
  untypedShowPopupMenu.mockReset();
});
