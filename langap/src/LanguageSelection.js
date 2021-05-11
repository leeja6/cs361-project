import {languageMapping} from './LanguageConsts';

function LanguageSelection(props) {

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
    props.onSetBaseLanguage(e.target.value);
  }

  function handleTargetLanguageChange(e) {
    props.onSetTargetLanguage(e.target.value);
  }

  function onPlayClicked() {
    props.onComplete();
  }

  return (
    <div>
    <div>
      <label for="baseLanguageSelect">Choose your default language: </label>
      <select name="baseLanguageSelect" onChange={handleBaseLanguageChange} id="baseLanguageSelect">
        {baseLanguageOptions}
      </select>
    </div>
    <div>
      <label for="targetLanguageSelect">Choose your learning language: </label>
      <select name="targetLanguageSelect" onChange={handleTargetLanguageChange} id="targetLanguageSelect">
        {targetLanguageOptions}
      </select>
    </div>
    <br/>
    <button type="button" onClick={onPlayClicked}>Play</button>
    </div>
  );
}

export default LanguageSelection;
