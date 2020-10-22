export default function (currentGuess, secretWord) {
  const secretLetters = secretWord.split("");
  const guessedLetters = new Set(currentGuess);
  const count = secretLetters.filter((letter) => guessedLetters.has(letter))
    .length;
  return count;
}
