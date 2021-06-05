import React, { useState } from 'react';
import LanguageSelection from './LanguageSelection';
import PlayGame from './PlayGame';
import './theme.css';

function App() {
  const [baseLanguage, setBaseLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [showLanguageSelection, setShowLanguageSelection] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [gamesWon, setGamesWon] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [theme, setTheme] = useState("light");
  const [themeButtonText, setThemeButtonText] = useState("Dark Mode");

  function hideLanguageSelectionAndShowGame() {
    setShowLanguageSelection(false);
    setShowGame(true);
  }

  function hideGameAndShowLanguageSelection() {
    setShowGame(false);
    setShowLanguageSelection(true);
  }

  function changeTheme() {
    if (theme=="light") {
      setTheme("dark");
      setThemeButtonText("Light Mode");
    }
    else {
      setTheme("light");
      setThemeButtonText("Dark Mode");
    }
  }

  return (
    <div className={`App ${theme}`}>
    <button style={{marginLeft: '10px'}} type="button" onClick={changeTheme}>{themeButtonText}</button>
    <h1 style={{margin: '10px'}}style={{margin: '10px'}}> LanGAP </h1>
    <h3 style={{margin: '10px'}}> a word-completion language-learning game </h3>
      { showLanguageSelection ?
      <div style={{margin: '10px'}}>
        <LanguageSelection baseLanguage={baseLanguage} targetLanguage={targetLanguage} onSetBaseLanguage={setBaseLanguage} onSetTargetLanguage={setTargetLanguage} onComplete={hideLanguageSelectionAndShowGame}/>
      </div>
      : null}
      { showGame ?
      <div>
        <PlayGame
          baseLanguage={baseLanguage}
          targetLanguage={targetLanguage}
          gamesWon={gamesWon}
          gamesPlayed={gamesPlayed}
          onSetGamesWon={setGamesWon}
          onSetGamesPlayed={setGamesPlayed}
          onComplete={hideGameAndShowLanguageSelection}
        />
      </div>
      : null}
    </div>
  );
}

export default App;
