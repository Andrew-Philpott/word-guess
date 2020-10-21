import React from "react";
import { shallow, mount } from "enzyme";
import SuccessContext from "./successContext";

const FunctionalComponent = () => {};

test("useSuccess throws error when not wrapped in SuccessProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useSuccess must be used within a SuccessProvider");
});

test("useSuccess does not throw error when wrapped in SuccessProvider", () => {
  expect(() => {
    mount(
      <SuccessContext.Provider>
        <FunctionalComponent />
      </SuccessContext.Provider>
    );
  }).not.toThrow();
});
