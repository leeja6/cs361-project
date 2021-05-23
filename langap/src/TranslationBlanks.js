import React, { useState, useEffect } from 'react';

function TranslationBlanks(props) {
  const [wordArray, setWordArray] = useState(props.text.split(" "));
  const [hiddenIndexes, setHiddenIndexes] = useState(getHiddenIndexes(wordArray.length));

  useEffect(() => {
    setWordArray(props.text.split(' '));
    setHiddenIndexes(getHiddenIndexes(wordArray.length));
  },[]);

  function onInputChanged(e) {
    var index = e.target.id;
    var currentValue = e.target.value;
    if (currentValue == wordArray[index]) {
      hiddenIndexes.delete(parseInt(index));
      setWordArray([...wordArray]);
      if (hiddenIndexes.size == 0) {
        props.onSuccess();
      }
    }
  }

  const words = wordArray.map((word, index) => {
    var length = wordArray.length;
    if (!props.showAll && hiddenIndexes.has(index)) {
      return index == length - 1 ? <span><input type="text" id={index} onChange={onInputChanged} size={wordArray[index].length}/>. </span> :
       <span><input type="text" id={index} onChange={onInputChanged} size={wordArray[index].length}/> </span>;
    }
    else {
      return index == length - 1 && word[word.length - 1] != '.' ? word + '.' : word + ' ';
    }
  });

  return (
    <div>
      <div id='wordsContainer'>
      {words}
      </div>
    </div>
  );
}

function getHiddenIndexes(wordCount) {
  var hiddenCount = wordCount * .15;
  var set = new Set();
  while(set.size < hiddenCount) {
    var index = Math.floor(Math.random() * wordCount);
    if (!set.has(index)) {
      set.add(index);
    }
  }
  return set;
}

export default TranslationBlanks;
