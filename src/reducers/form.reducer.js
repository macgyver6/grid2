import React from 'react'
import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';
import TextInputComponent from '../components/FormEntities/TextInput';
import TextAreaComponent from '../components/FormEntities/TextArea';
import defaultProps from '../constants/defaultPropsFE';

const formReducer = (state, action) => {
  if (typeof state === 'undefined') {
    state = {
      value: 0,
      form: [],
      lastSaved: null
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
      form: state.form.concat(action.formEntity)
    })
  }

  if (action.type === 'INITFORMENTITY') {
    return Object.assign({}, state, {
      form: state.form.concat((new TextInput({ uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'type', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true }).properties()))
    })
  }

  if (action.type === 'SAVESTATE') {
    let serialize = []
    state.form.map((element) => { serialize.push(element.properties()) })
    localStorage.setItem('model', JSON.stringify(serialize))
    return Object.assign({}, state, {
      lastSaved: Date.now()
    })
  }

  if (action.type === 'LOADSTATE') {
    let array = [];
    if (localStorage.getItem('model')) {
      JSON.parse(localStorage.getItem('model')).map((element, i) => {
        if (element.type === 'TextInput') {
          array.push((new TextInput({ ...element })))
        } else if (element.type === 'TextArea') {
          array.push((new TextArea({ ...element })))
        }
      })
      return { ...state, form: array };
    }
  }


  return state;
}

export default formReducer;