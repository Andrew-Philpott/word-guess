import React from "react";
import { mount } from "enzyme";
import Input from "./Input";
import SuccessContext from "./successContext";
import GuessedWordsContext from "./guessedWordsContext";
import { checkPropTypes } from "prop-types";

const setup = ({ secretWord, success }) => {
  secretWord = secretWord || "party";
  success = success || false;

  return mount(
    <SuccessContext.SuccessProvider va>
      <GuessedWordsContext.GuessedWordsProvider>
        <Input secretWord={secretWord} />
      </GuessedWordsContext.GuessedWordsProvider>
    </SuccessContext.SuccessProvider>
  );
};
test("Input renders without error", () => {
  const wrapper = setup({});
  const component = wrapper.find(`[data-test="component-input"]`);
  expect(component.length).toBe(1);
});
test("does not throw warning with expected props", () => {
  const propError = checkPropTypes(
    Input.propTypes,
    { secretWord: "party", success: false },
    "prop",
    Input.name
  );
  expect(propError).toBeUndefined();
});
describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });
  test("state updates with value of input box upon change", () => {
    const inputBox = wrapper.find(`[data-test="input-box"]`);
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
  test("field is cleared upon submit button click", () => {
    const submitButton = wrapper.find(`[data-test="submit-button"]`);
    submitButton.simulate("click", { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
test("input component does not show when success is true", () => {
  const wrapper = setup({ secretWord: "party", success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});
