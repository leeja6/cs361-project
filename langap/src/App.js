import React, { useState } from 'react';
import LanguageSelection from './LanguageSelection';
import PlayGame from './PlayGame';

function App() {
  const [baseLanguage, setBaseLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [showLanguageSelection, setShowLanguageSelection] = useState(true);
  const [showGame, setShowGame] = useState(false);

  function hideLanguageSelectionAndShowGame() {
    setShowLanguageSelection(false);
    setShowGame(true);
  }

  return (
    <div>
    <h1 style={{margin: '10px'}}style={{margin: '10px'}}> LanGAPs </h1>
    <h3 style={{margin: '10px'}}> a word-completion language-learning game </h3>
      { showLanguageSelection ?
      <div style={{margin: '10px'}}>
        <LanguageSelection baseLanguage={baseLanguage} targetLanguage={targetLanguage} onSetBaseLanguage={setBaseLanguage} onSetTargetLanguage={setTargetLanguage} onComplete={hideLanguageSelectionAndShowGame}/>
      </div>
      : null}
      { showGame ?
      <div>
        <PlayGame baseLanguage={baseLanguage} targetLanguage={targetLanguage}/>
      </div>
      : null}
    </div>
  );
}

export default App;
