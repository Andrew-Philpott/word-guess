import React from "react";

const guessedWordsContext = React.createContext();

export function useGuessedWords() {
  const context = React.useContext(guessedWordsContext);

  if (!context)
    throw new Error(
      "useGuessedWords must be used within a GuessedWordsProvider"
    );

  return context;
}

export function GuessedWordsProvider(props) {
  const [guessedWords, setGuessedWords] = React.useState([]);
  const value = React.memo(() => [guessedWords, setGuessedWords], [
    guessedWords,
  ]);

  return <guessedWordsContext.Provider value={value} {...props} />;
}
export default { GuessedWordsProvider, useGuessedWords };
