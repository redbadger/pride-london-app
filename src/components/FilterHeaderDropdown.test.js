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
    <FilterHeaderDropdown options={options} style={style} />
  );
  expect(output).toMatchSnapshot();
});

it("shows popup menu on press", async () => {
  const output = shallow(<FilterHeaderDropdown options={options} />);
  expect(output.state("picked")).toBe("Apple");

  // Simulate ref (should then be passed to showPopupMenu)
  const onRef = output.find(FilterHeaderButton).prop("onRef");
  const nodeRef = {};
  onRef(nodeRef);

  // Open popup menu and select "Bananas"
  untypedShowPopupMenu.mockResolvedValue("Bananas");
  output.simulate("press");
  expect(untypedShowPopupMenu).toHaveBeenCalledWith(options, nodeRef);

  // Validate state changed
  await new Promise(resolve => setTimeout(resolve));
  expect(output.state("picked")).toBe("Bananas");
});

it("shows popup menu on press (popup dismissed)", async () => {
  const output = shallow(<FilterHeaderDropdown options={options} />);
  expect(output.state("picked")).toBe("Apple");

  // Open popup menu and dismiss it (return undefined)
  output.simulate("press");
  expect(untypedShowPopupMenu).toHaveBeenCalledWith(options, null);

  // Validate state not changed
  await new Promise(resolve => setTimeout(resolve));
  expect(output.state("picked")).toBe("Apple");
});

afterEach(() => {
  untypedShowPopupMenu.mockReset();
});
