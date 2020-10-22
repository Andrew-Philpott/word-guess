import React from "react";
import "./App.css";
import { GuessedWordsProvider } from "./guessedWordsContext";
import { SuccessProvider } from "./successContext";
import Congratulations from "./Congratulations";
import Input from "./Input";

function App() {
  const secretWord = "party";
  return (
    <div data-test="component-app" className="App">
      <GuessedWordsProvider>
        <SuccessProvider>
          <Congratulations />
          <Input secretWord={secretWord} />
        </SuccessProvider>
      </GuessedWordsProvider>
    </div>
  );
}

export default App;
