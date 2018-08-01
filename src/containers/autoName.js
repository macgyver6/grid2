/**
 *
 * @param {string} rule ex. 'N+,L+
 * @param {string} previousInputName ex. '1a'
 * @param {Object} currentInput ex. '1a'
 */
export const autoNumberRuleResult = (rule, previousInputName, currentInput) => {
  console.log(currentInput);
  const alph = 'abcdefghijklmnopqrstuvwxyz'.split('');
  // This variable keeps track of whether to start over
  // at "a" for letters....

  const resetLetter = false;

  // This variable keeps track of whether to start over
  // at [0|1] for numbers....
  const resetNumber = false;
  // if (autoNumberRule)

  const lastValue = null;
  console.log(rule);
  if (rule[0] !== 'N') {
    throw new Error(
      'Auto-numbering rule must contain strictly alternating number and letter tokens, and the first token of the first rule must be numeric.'
    );
  }
  // console.log(rule, previousInputId === 'undefined');
  if (rule && previousInputName === undefined) {
    console.log('first input');
    return 1;
  }
  const ruleArr = rule.split(',');

  const handleLetter = indexPreviousL => {
    const previousInputNameArr = previousInputName.split('');
    const previousLetter = previousInputNameArr[indexPreviousL];
    console.log(previousLetter, previousInputNameArr, indexPreviousL);
    if (!previousLetter) {
      return 'a';
    } else if (previousLetter === 'z') {
      return 'a';
    } else {
      return incrementLetter(previousLetter);
    }
  };

  var incrementLetter = previousLetter => String.fromCharCode(previousLetter.charCodeAt(0) + 1);

  const handleNumber = indexPreviousN => {
    console.log(previousInputName);
    const arrPreviousInputName = previousInputName.split('');
    const previousNumber = arrPreviousInputName[indexPreviousN];
    console.log(arrPreviousInputName, arrPreviousInputName[indexPreviousN]);
    if (!previousNumber) {
      return '1';
    } else {
      return incrementNumber(previousNumber);
    }
  };

  var incrementNumber = previousN => Number(previousN) + 1;

  console.log(ruleArr.map((rule, index) => (rule[0] === 'N' ? handleNumber(index) : handleLetter(index))));
  const result = ruleArr.map((rule, index) => (rule[0] === 'N' ? handleNumber(index) : handleLetter(index)));
  return result.toString().replace(',', '');
};

export const indent = rule => {
  const ruleArr = rule.split(',');
  if (ruleArr[ruleArr.length - 1] !== 'N+') {
    throw new Error('Must alternate number, letter');
  } else {
    return rule.concat(',L+');
  }
};

export const unindent = rule => {
  const ruleArr = rule.split(',');
  console.log(ruleArr);
  // if (ruleArr[ruleArr.length - 1] !== 'L+') {
  //   throw new Error('Cannot be indented less than predecessor');
  // } else {
  ruleArr.pop();
  console.log(ruleArr);
  return ruleArr.toString();
  // }
};

/**
 *
 * @param {number} originIndex
 * @param {number} newIndex
 * @param {Array} arrInputs
 */
export const changeOrder = (indexOfSource, indexOfDestination, arrInputs) => {
  // const indexOfSource = Number(event.dataTransfer.types[1]);
  // const indexOfDestination = props.form.children().indexOf(props.model);
  const _arrInputs = [...arrInputs];
  const entityRemoved = _arrInputs.splice(indexOfSource, 1);
  const entityInsertedAtNewIndex = _arrInputs.splice(indexOfDestination, 0, entityRemoved[0]);
  return _arrInputs;
};

// const previousInputId = '2a1b';
// const testRule = 'N+,L+,N+,L+,N+,L+';
// console.log(autoNumberRuleResult(testRule, previousInputId));
// console.log(indent(testRule))
// console.log(unindent(testRule))
// console.log(changeOrder(0, 3, [
//   {name: 'one', tabOrder: 1},
//   {name: 'two', tabOrder: 2},
//   {name: 'three', tabOrder: 3}
// ]))
