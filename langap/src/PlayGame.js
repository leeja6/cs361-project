import React, { useState, useEffect } from 'react';
import {languageMapping} from './LanguageConsts';
import TranslationBlanks from './TranslationBlanks';

function PlayGame(props) {
  const [baseLanguageText, setBaseLanguageText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [baseLanguageCode, setBaseLanguageCode] = useState(props.baseLanguage);
  const [targetLanguageCode, setTargetLanguageCode] = useState(props.targetLanguage);
  const [wonGame, setWonGame] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const [gamesWon, setGamesWon] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  var baseLanguageLabel = ""
  var targetLanguageLabel = ""
  for (var i = 0; i < languageMapping.length; i++) {
    if (languageMapping[i].value == baseLanguageCode) {
      baseLanguageLabel = languageMapping[i].label;
    }
    if (languageMapping[i].value == targetLanguageCode) {
      targetLanguageLabel = languageMapping[i].label;
    }
  }

  useEffect(() => {
    getRandomTextAndTranslate();
  }, [])

  function gameWon() {
    setWonGame(true);
    setGamesWon(gamesWon + 1);
    setGamesPlayed(gamesPlayed + 1);
  }

  function showGaveUp() {
    setGaveUp(true);
    setGamesPlayed(gamesPlayed + 1);
  }

  function getNewPuzzle() {
    getRandomTextAndTranslate();
    setGaveUp(false);
    setWonGame(false);
  }

  function translateText(text, language, setBase) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Text: text })
    };
    fetch('https://translation-microservice.azurewebsites.net?toLanguageCode=' + language, requestOptions)
        .then(response => response.text())
        .then(data => {
          if (setBase) {
            setBaseLanguageText(data);
          }
          else {
            setTranslatedText(data);
          }
        });
  }

  function getRandomTextAndTranslate() {
    fetch("https://backendcs361.herokuapp.com/abstract/Special:Random", )
      .then(response => response.text())
      .then(result => {
        var firstSentence = result.split('.')[0].substring(1);
        if (baseLanguageCode != 'en') {
          translateText(firstSentence, baseLanguageCode, true);
        }
        else {
          setBaseLanguageText(firstSentence);
        }
        translateText(firstSentence, targetLanguageCode, false);
      })
  }

  return (
    <div style={{margin: '10px'}}>
      {wonGame ? <h2 style={{outline: "1px solid black", width: "fit-content", padding: "10px", background: "linear-gradient(to right, red, orange , yellow, green, blue, violet)"}}>Congrats! You did it!</h2> : null}
      {gaveUp ? <h2 style={{outline: "1px solid black", width: "fit-content", padding: "10px", background: "linear-gradient(to right, pink, white)"}}>Good Try</h2> : null}
    <div style={{display:'flex', width: '100%', flexDirection: 'row'}}>
      <div style={{padding:'10px', flex: '1', backgroundColor:"whiteSmoke"}}>
        <h4>Default Language: {baseLanguageLabel}</h4>
        {baseLanguageText}
      </div>
      <div style={{padding:'10px', flex: '1', backgroundColor:"lightGrey"}}>
        <h4>Learning Language: {targetLanguageLabel}</h4>
        <TranslationBlanks key={translatedText} showAll={wonGame || gaveUp} text={translatedText} onSuccess={gameWon}/>
      </div>
    </div>
    <div>
        {wonGame || gaveUp ?
        <button type="button" onClick={getNewPuzzle}>New Puzzle</button>
        :
        <button type="button" onClick={showGaveUp}>Give Up</button>}
      </div>
      <div>
      <h3>Wins: {gamesWon}, Games Played: {gamesPlayed}</h3>

      </div>
    </div>
  );
}

export default PlayGame;
