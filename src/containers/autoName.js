import { address } from '../address';
import * as actions from '../actions/index';

/**
 *
 * @param {Number} evaluateThisIndexOfRule The index of the current ruleArr being evaluated
 * @param {Array} currentIdArr The last detirmined ID that will be used to detirmine the next ID
 * @param {String} currentRule The rule of the last detirmined ID that will be used to detirmine the next ID
 * @param {String} nextRule The rule of the next input that will be evaluated
 * @param {Number} currentIndex Index of current rule in arr of rules
 */
const handleLetter = (evaluateThisIndexOfRule, currentIdArr, currentRule, nextRule, currentIndex) => {
  console.log(currentIndex);
  // const currentRuleArr = currentRule.split(',');
  const nextRuleArr = nextRule.split(',');
  if (currentIndex === 0) {
    return 'a';
  }
  const previousLetter = currentIdArr[evaluateThisIndexOfRule];
  if (!previousLetter) {
    return 'a';
  } else if (previousLetter === 'z') {
    return 'a';
  } else if (currentRule.split(',')[currentRule.split(',').length - 1] === 'N+') {
    return 'a';
  } else if (previousLetter && nextRuleArr[nextRuleArr.length - 2] !== 'N+') {
    // console.log('look at previous ending letter', incrementLetter(currentIdArr[currentIdArr.length - 1]))
    return incrementLetter(previousLetter);
  } else if (nextRuleArr[nextRuleArr.length - 2] === 'N+') {
    // console.log('here 4: ', currentIdArr)
    return 'a';
  }
};

const incrementLetter = previousLetter => String.fromCharCode(previousLetter.charCodeAt(0) + 1);

/**
 *
 * @param {String} nextRule The rule of the next input that will be evaluated
 * @param {Number} evaluateThisIndexOfRule The index of the current ruleArr being evaluated
 * @param {Array} currentIdArr The last detirmined ID that will be used to detirmine the next ID
 * @param {Number} currentIndex Index of current rule in arr of rules
 */
const handleNumber = (nextRule, evaluateThisIndexOfRule, currentIdArr, currentIndex) => {
  const nextRuleArr = nextRule.split(',');
  // handle case where currentIndex === 0 and rule is N
  if (nextRuleArr[evaluateThisIndexOfRule] === 'N' && currentIndex === 0) {
    return '0';
  } else if (nextRuleArr[0] === 'N+' && currentIndex === 0) {
    // handle case where currentIndex === 0 and rule is N+
    return '1';
  } else if (nextRuleArr[evaluateThisIndexOfRule] === 'N+') {
    // get next number rule: N+ (typical case)
    return incrementNumber(currentIdArr[evaluateThisIndexOfRule]);
  } else if (nextRuleArr[evaluateThisIndexOfRule] === 'N') {
    // N (typical case)
    return currentIdArr[evaluateThisIndexOfRule];
  }
};

const incrementNumber = previousN => Number(previousN) + 1;

/**
 *
 * @param {Array} ruleArr ex. ['N+', 'L+'] Array of the current auto name rule to evaluate
 * @param {Number} currentIndex  Index within ruleArr currently being evaluated
 * @param {String} currentId The last detirmined ID that will be used to detirmine the next ID
 * @param {Array} arrRules Array of all rules being evaluated
 */
const evaluateCurrentRule = (ruleArr, currentIndex, currentId, arrRules) =>
  ruleArr.map(
    (rule, index) =>
      rule[0] === 'N'
        ? handleNumber(arrRules[currentIndex], index, currentId, currentIndex)
        : handleLetter(index, currentId, arrRules[currentIndex - 1], arrRules[currentIndex], currentIndex)
  );

/**
 *
 * @param {Array} arrRules ex. ['1', '1a'...]
 * @param {Number} goalIndex ex. 2
 * @param {Number} [currentId] optional - Current ID being evaluated
 * @param {Number} [currentIndex=0] optional - Current index of arrRules to evaluate
 */
export const getExternalIdentifier = (arrRules, goalIndex, currentId, currentIndex = 0) => {
  const alph = 'abcdefghijklmnopqrstuvwxyz'.split('');
  if (goalIndex === 0) {
    const ruleArr = arrRules[currentIndex].split(',');
    return evaluateCurrentRule(ruleArr, currentIndex, currentId, arrRules)
      .toString()
      .replace(/\,/g, '');
  } else if (currentIndex === goalIndex) {
    console.log(arrRules, currentIndex);

    const ruleArr = arrRules[currentIndex].split(',');
    return evaluateCurrentRule(ruleArr, currentIndex, currentId, arrRules);
  } else {
    console.log(arrRules[currentIndex]);
    const ruleArr = arrRules[currentIndex].split(',');
    const result = evaluateCurrentRule(ruleArr, currentIndex, currentId, arrRules);
    return getExternalIdentifier(arrRules, goalIndex, result, currentIndex + 1)
      .toString()
      .replace(/\,/g, '');
  }
};

export const indent = rule => {
  const ruleArr = rule.split(',');
  if (ruleArr[ruleArr.length - 1] === 'N+') {
    return rule.concat(',L+');
  } else if (ruleArr[ruleArr.length - 1] === 'N') {
    return rule.concat(',L+');
  } else if (ruleArr[ruleArr.length - 1] === 'L') {
    return rule.concat(',N+');
  } else if (ruleArr[ruleArr.length - 1] === 'L+') {
    return rule.concat(',N+');
  }
  // }
};

export const unindent = rule => {
  const ruleArr = rule.split(',');
  if (ruleArr[ruleArr.length - 1] !== 'N') {
    ruleArr.pop();
    return ruleArr.toString();
  } else {
    return rule;
  }
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
  const _arrInputs = [...arrInputs];
  const entityRemoved = _arrInputs.splice(indexOfSource - 1, 1);
  const entityInsertedAtNewIndex = _arrInputs.splice(indexOfDestination - 1, 0, entityRemoved[0]);
  return _arrInputs;
};

/**
 *
 * @param {Array} arrAllInputs instantiated instances of formEntities
 * @param {Form} form
 * @param {Function} mutate
 */
export const assignAllNamesBatch = (arrAllInputs, form) => {
  const arrRules = [...arrAllInputs].map(input => input.autoNumberRule());
  const applyPrefix = form.autoId().prefix ? form.autoId().prefix : '';
  console.log(applyPrefix);
  const result = [...arrAllInputs].map((inputs, index) =>
    actions.mutate(address.bySample([...arrAllInputs][index], form), {
      externalIdentifier: `${applyPrefix}${getExternalIdentifier(arrRules, index)}`,
    })
  );
  return result;
};
