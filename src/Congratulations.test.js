import React from "react";
import { shallow } from "enzyme";
import Congratulations from "./Congratulations";

test("renders without error", () => {
  const wrapper = shallow(<Congratulations />);
  expect(wrapper.length).toBe(1);
});
test("does not render a congratulations message when success is false", () => {
  const wrapper = shallow(<Congratulations {...{ success: false }} />);
  const component = wrapper.find(`[data-test="component-congratulations"]`);
  expect(component.text()).toBe("");
});
test("renders a congratulations message when 'success' is true", () => {
  const wrapper = shallow(<Congratulations {...{ success: true }} />);
  const message = wrapper.find(`[data-test="congratulations-message"]`);
  expect(message.text().length).not.toBe(0);
});
