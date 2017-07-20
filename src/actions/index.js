// export const INCREMENT = 'INCREMENT'
// export const increment = { type: 'INCREMENT' };
// export const DECREMENT = 'DECREMENT'
// export const decrement = { type: 'DECREMENT' };
// export const ADDFORMENTITY = 'ADDFORMENTITY'
// export const addformentity = { type: 'ADDFORMENTITY' };
import { TextInput } from '../data/TextInput';
const entitySpec = {
  TextInput: { uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'type', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'This is default content'}
}

export const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

export const addformentity = (inputType) => {
  return {
    type: 'ADDFORMENTITY',
    payload : entitySpec[inputType],
    inputType: inputType
  }
}

export const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}

export const initformentity = () => {
  return {
    type: 'INITFORMENTITY',
  }
}


/*
  -- alternate method of exporting (for only 1 action) --
const increment = { type: 'INCREMENT' }
export default increment;
*/