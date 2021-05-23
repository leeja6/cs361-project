import {languageMapping} from './LanguageConsts';
import './App.css';
import React, { Component, useState } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

function LanguageSelection(props) {
  const [baseLanguageMapping, setBaseLanguageMapping] = useState(languageMapping);
  const [targetLanguageMapping, setTargetLanguageMapping] = useState(languageMapping);

  var baseLanguageOptions = [];
  for (var i = 0; i < languageMapping.length; i++) {
    var value = languageMapping[i].value;
    var label = languageMapping[i].label
    var tag = value == props.baseLanguage ? <option selected value={value}>{label}</option> : <option value={value}>{label}</option>
    baseLanguageOptions.push(tag);
  }
  var targetLanguageOptions = [];
  for (var i = 0; i < languageMapping.length; i++) {
    var value = languageMapping[i].value;
    var label = languageMapping[i].label
    var tag = value == props.targetLanguage ? <option selected value={value}>{label}</option> : <option value={value}>{label}</option>
    targetLanguageOptions.push(tag);
  }

  function handleBaseLanguageChange(e) {
    var newLanguageMapping = [...languageMapping];
    props.onSetBaseLanguage(e.value);
    for ( var i = 0; i < newLanguageMapping.length; i++){
        if ( newLanguageMapping[i] === e) {
            newLanguageMapping.splice(i, 1);
        }
      }
    setTargetLanguageMapping(newLanguageMapping);
    }

  function handleTargetLanguageChange(e) {
    var newBaseLanguageMapping = [...languageMapping];
    props.onSetTargetLanguage(e.value);
    for ( var i = 0; i < newBaseLanguageMapping.length; i++){
        if ( newBaseLanguageMapping[i] === e) {
            newBaseLanguageMapping.splice(i, 1);
        }
      }
    setBaseLanguageMapping(newBaseLanguageMapping);
  }

  function onPlayClicked() {
    props.onComplete();
  }

  return (
    <div>
    <div style={{width: '400px'}}>
      <label for="baseLanguageSelect">Choose your default language: </label>
      <Select isSearchable menuPlacement="auto" onChange={handleBaseLanguageChange} options={baseLanguageMapping} name="baseLanguageSelect" id="baseLanguageSelect" autoFocus={true}/>
    </div>
    <br/>
    <div style={{width: '400px'}}>
      <label for="targetLanguageSelect">Choose your learning language: </label>
      <Select isSearchable menuPlacement="auto" onChange={handleTargetLanguageChange} options={targetLanguageMapping} name="targetLanguageSelect"id="targetLanguageSelect" autoFocus={true}/>
    </div>
    <br/>
    <Button style={{padding: "5px 10px", fontSize: "medium"}} type="button" onClick={onPlayClicked}>Play</Button>
    </div>
  );
}

export default LanguageSelection;
