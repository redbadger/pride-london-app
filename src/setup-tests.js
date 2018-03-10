import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

require("jest-mock-now")(new Date("2018-03-10"));

Enzyme.configure({ adapter: new Adapter() });
