import React, { useState, useEffect } from 'react';
import {languageMapping} from './LanguageConsts';
import TranslationBlanks from './TranslationBlanks';
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function PlayGame(props) {
  const [numHintsRequested, setNumHintsRequested] = useState(0);
  const [baseLanguageText, setBaseLanguageText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [reserveBaseLanguageText, setReserveBaseLanguageText] = useState('');
  const [reserveTranslatedText, setReserveTranslatedText] = useState('');
  const [baseLanguageCode, setBaseLanguageCode] = useState(props.baseLanguage);
  const [targetLanguageCode, setTargetLanguageCode] = useState(props.targetLanguage);
  const [wonGame, setWonGame] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const [loadScreen, setLoadScreen] = useState(true);
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
    getRandomTextAndTranslateReserve();
  }, [])

  function gameWon() {
    setWonGame(true);
    props.onSetGamesWon(props.gamesWon + 1);
    props.onSetGamesPlayed(props.gamesPlayed + 1);
  }

  function showGaveUp() {
    setGaveUp(true);
    props.onSetGamesPlayed(props.gamesPlayed + 1);
  }

  function getNewHint() {
    setNumHintsRequested(numHintsRequested + 1);
  }

  function getNewPuzzle() {
    getRandomTextAndTranslateReserve();
    setGaveUp(false);
    setWonGame(false);
    setNumHintsRequested(0);
  }

  function translateTextReserve(text, language, setBase) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Text: text })
    };
    fetch('https://translation-microservice.azurewebsites.net?toLanguageCode=' + language, requestOptions)
        .then(response => response.text())
        .then(data => {
          if (setBase) {
            setReserveBaseLanguageText(data);
          }
          else {
            setReserveTranslatedText(data);
          }
        });
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
            setLoadScreen(false);
          }
        });
  }

  function getRandomTextAndTranslateReserve() {
    setBaseLanguageText(reserveBaseLanguageText);
    setTranslatedText(reserveTranslatedText);
    fetch("https://daniel-yu.herokuapp.com/get_random", )
      .then(response => response.json())
      .then(result => {
        var firstSentence = result.content.split('.')[0];
        if (baseLanguageCode != 'en') {
          translateTextReserve(firstSentence, baseLanguageCode, true);
        }
        else {
          setReserveBaseLanguageText(firstSentence);
        }
        translateTextReserve(firstSentence, targetLanguageCode, false);
      })
  }



    function getRandomTextAndTranslate() {
    fetch("https://daniel-yu.herokuapp.com/get_random", )
      .then(response => response.json())
      .then(result => {
        var firstSentence = result.content.split('.')[0];
        if (baseLanguageCode != 'en') {
          translateText(firstSentence, baseLanguageCode, true);
        }
        else {
          setBaseLanguageText(firstSentence);
        }
        translateText(firstSentence, targetLanguageCode, false);
      })
  }

  function onReturnClicked() {
    props.onComplete();
  }

    return (
    <div style={{margin: '10px'}}>
      {wonGame ? <h2 style={{outline: "1px solid black", width: "fit-content", padding: "10px", background: "linear-gradient(to right, red, orange , yellow, green, blue, violet)"}}>Congrats! You did it!</h2> : null}
      {gaveUp ? <h2 style={{outline: "1px solid black", width: "fit-content", padding: "10px", background: "linear-gradient(to right, pink, white)"}}>Good Try</h2> : null}
    <div style={{display:'flex', width: '100%', flexDirection: 'row'}}>
      <div style={{padding:'10px', flex: '1', backgroundColor:"whiteSmoke", color:"black"}}>
        <h4>Default Language: {baseLanguageLabel}</h4>
        {baseLanguageText}{loadScreen ?
        <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
       /> : <span>.</span>}
      </div>
      <div style={{padding:'10px', flex: '1', backgroundColor:"lightGrey", color:"black"}}>
        <h4>Learning Language: {targetLanguageLabel}</h4>
        {loadScreen ?
        <Loader
         type="Puff"
         color="pink"
         height={100}
         width={100}
       />:
       <TranslationBlanks key={translatedText} numHints={numHintsRequested} showAll={wonGame || gaveUp} text={translatedText} onFail={showGaveUp} onSuccess={gameWon}/>}
       </div>
    </div>
    <br/>
    <div>
        {wonGame || gaveUp ?
        <button type="button" onClick={getNewPuzzle}>New Puzzle</button>
        :
        <div><button type="button" title="Fill in one missing or incorrect blank" onClick={getNewHint}>Hint</button>
        <button type="button" title="Fill in all remaining blanks to finish the round" onClick={showGaveUp}>Give Up</button></div>}
      </div>
      <div>
        <button type="button" onClick={onReturnClicked}>Return to Language Selection</button>
      </div>
      <div>
      <h3>Wins: {props.gamesWon}, Games Played: {props.gamesPlayed}</h3>
      </div>
    </div>
  );
}

export default PlayGame;
