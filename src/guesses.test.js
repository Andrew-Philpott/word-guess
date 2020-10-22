import React from "react";
import { mount } from "enzyme";
import { GuessedWordsProvider } from "./guessedWordsContext";
import { SuccessProvider } from "./successContext";
import Input from "./Input";
import GuessedWords from "./GuessedWords";

function setup(guessedWordsStrings = [], secretWord = "party") {
  const wrapper = mount(
    <GuessedWordsProvider>
      <SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </SuccessProvider>
    </GuessedWordsProvider>
  );
  const inputBox = wrapper.find(`[data-test="input-box"]`);
  const submitButton = wrapper.find(`[data-test="submit-button"]`);
  guessedWordsStrings.map((word) => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click");
  });
  return [wrapper, inputBox, submitButton];
}

describe("test word guesses", () => {
  let wrapper;
  let inputBox;
  let submitButton;

  describe("non-empty guessedWords", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup(["agile"], "party");
    });
    describe("correct guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "party" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      test("Input component contains no children", () => {
        const inputComponent = wrapper.find(`[data-test="component-input"]`);
        expect(inputComponent.children().length).toBe(0);
      });
      test("GuessedWords table row count reflects updated guess", () => {
        const guessedWordsTableRows = wrapper.find(
          `[data-test="guessed-word"]`
        );
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
    describe("incorrect guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "train" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      test("Input box remains", () => {
        expect(inputBox.exists()).toBe(true);
      });
      test("GuessedWords table row count reflects updated guess", () => {
        const guessedWordsTableRows = wrapper.find(
          `[data-test="guessed-word"]`
        );
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
  });
  describe("empty guessWords", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup([], "party");
    });
    test("guessedWords shows correct guesses after incorrect guess", () => {
      const mockEvent = { target: { value: "train" } };
      inputBox.simulate("change", mockEvent);
      submitButton.simulate("click");
      const guessedWordsTableRows = wrapper.find(`[data-test="guessed-word"]`);
      expect(guessedWordsTableRows.length).toBe(1);
    });
  });
});
