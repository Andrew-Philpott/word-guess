import React from "react";
import { mount } from "enzyme";
import GuessedWords from "./GuessedWords";
import guessedWordsContext from "./guessedWordsContext";

const setup = (guessedWords = []) => {
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return mount(
    <guessedWordsContext.GuessedWordsProvider>
      <GuessedWords />
    </guessedWordsContext.GuessedWordsProvider>
  );
};

describe("if there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup([]);
  });
  test("renders without error", () => {
    const component = wrapper.find(`[data-test="component-guessed-words"]`);
    expect(component.length).toBe(1);
  });
  test("renders instructions to guess a word", () => {
    const instructions = wrapper.find(`[data-test="guess-instructions"]`);
    expect(instructions.text().length).not.toBe(0);
  });
});
describe("if there are words guessed", () => {
  let wrapper;
  const guessedWords = [
    { word: "train", letterMatchCount: 1 },
    { word: "agile", letterMatchCount: 3 },
    { word: "party", letterMatchCount: 5 },
  ];
  beforeEach(() => {
    wrapper = setup(guessedWords);
  });
  test("renders without error", () => {
    const component = wrapper.find(`[data-test="component-guessed-words"]`);
    expect(component.length).toBe(1);
  });
  test("renders 'guessed words' section", () => {
    const guessedWordsNode = wrapper.find(`[data-test="guessed-words"]`);
    expect(guessedWordsNode.length).toBe(1);
  });
  test("correct number of guessed words", () => {
    const guessedWordsNodes = wrapper.find(`[data-test="guessed-word"]`);
    expect(guessedWordsNodes.length).toBe(guessedWords.length);
  });
});
