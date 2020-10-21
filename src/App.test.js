import { mount } from "enzyme";
import React from "react";
import App from "./App";

test("renders the app component correctly", () => {
  const wrapper = mount(<App />);
  const component = wrapper.find(`[data-test="component-app"]`);
  expect(component.length).toBe(1);
});
