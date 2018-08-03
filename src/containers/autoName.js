import { address } from '../address';

/**
 *
 * @param {string} rule ex. 'N+,L+
 * @param {string} previousInputName ex. '1a'
 * @param {Object} currentInput ex. '1a'
 */
export const autoNumberRuleResult = (rule, previousInputName, currentInput) => {
  console.log(rule, previousInputName, currentInput);
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
  // if (rule[0] !== 'N') {
  //   throw new Error(
  //     'Auto-numbering rule must contain strictly alternating number and letter tokens, and the first token of the first rule must be numeric.'
  //   );
  // }
  // console.log(rule, previousInputId === 'undefined');
  if (rule && previousInputName === undefined) {
    console.log('first input');
    return 1;
  }
  console.log(rule);
  const ruleArr = rule.split(',');

  const handleLetter = (indexPreviousL, rule) => {
    const previousInputNameArr = previousInputName.split('');
    const previousLetter = previousInputNameArr[indexPreviousL];
    console.log(previousLetter, previousInputNameArr, indexPreviousL, ruleArr);
    if (!previousLetter) {
      return 'a';
    } else if (previousLetter === 'z') {
      return 'a';
    } else if (ruleArr[indexPreviousL - 1] === 'N+') {
      return 'a';
    } else {
      return incrementLetter(previousLetter);
    }
  };

  var incrementLetter = previousLetter => String.fromCharCode(previousLetter.charCodeAt(0) + 1);

  const handleNumber = (indexPreviousN, rule) => {
    console.log(previousInputName);
    const arrPreviousInputName = previousInputName.split(/(\d+)/).filter(item => item !== '');
    const previousNumber = arrPreviousInputName[indexPreviousN];
    console.log(arrPreviousInputName, arrPreviousInputName[indexPreviousN]);
    if (!previousNumber) {
      return '1';
    } else if (ruleArr[indexPreviousN] === 'N+') {
      console.log(incrementNumber(previousNumber));
      return incrementNumber(previousNumber);
    } else if (ruleArr[indexPreviousN] === 'N') {
      return previousNumber;
    }
  };

  var incrementNumber = previousN => Number(previousN) + 1;

  const result = ruleArr.map(
    (rule, index) => (rule[0] === 'N' ? handleNumber(index, rule) : handleLetter(index, rule))
  );
  return result.toString().replace(',', '');
};

export const indent = rule => {
  const ruleArr = rule.split(',');
  // console.log(ruleArr[ruleArr.length - 1] !== 'N+' && ruleArr[ruleArr.length - 1] !== 'N');
  if (ruleArr[ruleArr.length - 1] !== 'N+' && ruleArr[ruleArr.length - 1] !== 'N') {
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

export const moveUp = rule => {
  const ruleArr = rule.split(',');
};

export const movDown = rule => {
  const ruleArr = rule.split(',');
};

/**
 *
 * @param {number} originIndex
 * @param {number} newIndex
 * @param {Array} arrInputs
 */
export const changeOrder = (indexOfSource, indexOfDestination, arrInputs) => {
  console.log(indexOfSource, indexOfDestination, arrInputs);
  // const indexOfSource = Number(event.dataTransfer.types[1]);
  // const indexOfDestination = props.form.children().indexOf(props.model);
  const _arrInputs = [...arrInputs];
  const entityRemoved = _arrInputs.splice(indexOfSource - 1, 1);
  const entityInsertedAtNewIndex = _arrInputs.splice(indexOfDestination - 1, 0, entityRemoved[0]);
  console.log(entityRemoved, _arrInputs);
  return _arrInputs;
};

/**
 *
 * @param {Array} arrAllInputs instantiated instances of formEntities
 * @param {Form} form
 * @param {Function} mutate
 */
export const assignAllNames = (arrAllInputs, form, mutate) => {
  let output = [];
  return [...arrAllInputs].forEach((input, index) => {
    if (index === 0) {
      const result2 = Object.assign({}, input.properties(), {
        externalIdentifier: '1',
      });
      output.push(result2);
      mutate(address.bySample([...arrAllInputs][index], form), {
        externalIdentifier: '1',
      });
    } else if (index === arrAllInputs.length) {
      console.log('reached end', output);
      return output;
    } else if (index >= 1) {
      // const previousEntity = address.byPath[]
      const currentEntityAddress = address.bySample([...arrAllInputs][index], form);
      const previousEntityAddress = [...currentEntityAddress].splice(
        currentEntityAddress.length - 1,
        1,
        [...currentEntityAddress][currentEntityAddress.length - 1] - 1
      );
      const previousEntity = () => {
        const _currentAddress = [...currentEntityAddress];

        _currentAddress.splice(
          currentEntityAddress.length - 1,
          1,
          currentEntityAddress[currentEntityAddress.length - 1] - 1
        );

        return address.byPath(form, _currentAddress);
      };
      console.log(input, input.autoNumberRule(), output[index - 1].externalIdentifier);
      const newExternalIdentifier = autoNumberRuleResult(input.autoNumberRule(), output[index - 1].externalIdentifier);
      const result2 = Object.assign({}, input.properties(), {
        externalIdentifier: newExternalIdentifier,
      });
      output.push(result2);
      mutate(address.bySample([...arrAllInputs][index], form), {
        externalIdentifier: newExternalIdentifier,
      });
    }
  });
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
