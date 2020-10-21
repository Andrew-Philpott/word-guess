import React from "react";
export default ({ guessedWords }) => {
  return (
    <div data-test="component-guessed-words">
      {guessedWords.length === 0 ? (
        <p data-test="guess-instructions">Try to guess the secret word</p>
      ) : (
        <div data-test="guessed-words">
          <table>
            <thead>
              <tr>
                <th>Guess</th>
                <th># of matching letters</th>
              </tr>
            </thead>
            <tbody>
              {guessedWords.map((word, i) => (
                <tr data-test="guessed-word" key={i}>
                  <td>{word.word}</td>
                  <td>{word.letterMatchCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
