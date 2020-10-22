import React from "react";
import { shallow, mount } from "enzyme";
import { useSuccess, SuccessProvider } from "./successContext";

const FunctionalComponent = () => {
  useSuccess();
  return <div />;
};

test("useSuccess throws error when not wrapped in SuccessProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useSuccess must be used within a SuccessProvider");
});

test("useSuccess does not throw error when wrapped in SuccessProvider", () => {
  expect(() => {
    mount(
      <SuccessProvider>
        <FunctionalComponent />
      </SuccessProvider>
    );
  }).not.toThrow();
});
