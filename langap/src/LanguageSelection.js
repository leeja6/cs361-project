import {languageMapping, languageNameDictionary} from './LanguageConsts';
import './App.css';
import React, { Component, useState } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

function LanguageSelection(props) {
  const [baseLanguageMapping, setBaseLanguageMapping] = useState(languageMapping);
  const [targetLanguageMapping, setTargetLanguageMapping] = useState(languageMapping);

  var targetLanguageOptions = populateDropdown(props.targetLanguage);
  var baseLanguageOptions = populateDropdown(props.baseLanguage);

  function populateDropdown(language) {
    var optionsArray = [];
    for (var i = 0; i < languageMapping.length; i++) {
      var value = languageMapping[i].value;
      var label = languageMapping[i].label
      var tag = value == language ? <option selected value={value}>{label}</option> : <option value={value}>{label}</option>
      optionsArray.push(tag);
    }
    return optionsArray;
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

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted white',
      color: state.isSelected ? 'white' : 'black',
      padding: '10px',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }

  return (
    <div>
    <div style={{width: '400px'}}>
      <label for="baseLanguageSelect">Choose your default language: </label>
      <Select styles={customStyles} value={{value: props.baseLanguage, label: languageNameDictionary[props.baseLanguage]}} isSearchable menuPlacement="auto" onChange={handleBaseLanguageChange} options={baseLanguageMapping} name="baseLanguageSelect" id="baseLanguageSelect" autoFocus={true}/>
    </div>
    <br/>
    <div style={{width: '400px'}}>
      <label for="targetLanguageSelect">Choose your learning language: </label>
      <Select styles={customStyles} value={{value: props.targetLanguage, label: languageNameDictionary[props.targetLanguage]}} isSearchable menuPlacement="auto" onChange={handleTargetLanguageChange} options={targetLanguageMapping} name="targetLanguageSelect"id="targetLanguageSelect" autoFocus={true}/>
    </div>
    <br/>
    <Button style={{padding: "5px 10px", fontSize: "medium"}} type="button" onClick={onPlayClicked}>Play</Button>
    </div>
  );
}

export default LanguageSelection;
