import "react-native";
import renderer from "react-test-renderer";
import React from "react";
import App from "../App";

it("renders correctly", () => {
  expect(() => renderer.create(<App />)).not.toThrow();
});
