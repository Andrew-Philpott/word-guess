import React from "react";
import { useSuccess } from "./successContext";
import { useGuessedWords } from "./guessedWordsContext";
import PropTypes from "prop-types";

function Input({ secretWord }) {
  const [success, setSuccess] = useSuccess();
  const [guessedWords, setGuessedWords] = useGuessedWords();
  const [currentGuess, setCurrentGuess] = React.useState("");

  if (success) {
    return null;
  }

  return (
    <div data-test="component-input">
      <form>
        <input
          data-test="input-box"
          type="text"
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button
          data-test="submit-button"
          onClick={(e) => {
            e.preventDefault();
            const secretLetters = secretWord.split("");
            const guessedLetters = new Set(currentGuess);
            const count = secretLetters.filter((letter) =>
              guessedLetters.has(letter)
            ).length;
            const newGuessedWords = [
              ...guessedWords,
              { word: currentGuess, letterMatchCount: count },
            ];
            setGuessedWords(newGuessedWords);
            if (currentGuess === secretWord) setSuccess(true);

            setCurrentGuess("");
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
