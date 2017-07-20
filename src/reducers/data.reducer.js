import { TextInput } from '../data/TextInput';

function reducer(state, action) {
  if(typeof state === 'undefined') {
    state = {
      value: 0,
      form: []
    }
  }
  if (action.type === 'INCREMENT') {
    return Object.assign({}, state, {
      value: state.value + 1
    })
  }
  if (action.type === 'DECREMENT') {
    return Object.assign({}, state, {
      value: state.value - 1
    })
  }
  if (action.type === 'ADDFORMENTITY') {
    return Object.assign({}, state, {
      form: state.form.concat((new TextInput({uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'type', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true}).properties()))
    })
  }
  return state;
}

export default reducer;