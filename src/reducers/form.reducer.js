import React from 'react'
import { TextInput } from '../data/TextInput';
import TextInputComponent  from '../components/FormEntities/TextInput';
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
    console.log('increment reducer hit')
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
    console.log('INITFORMENTITY')
    return Object.assign({}, state, {
      form: state.form.concat((new TextInput({ uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'type', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true }).properties()))
    })
  }

  if (action.type === 'SAVESTATE') {
    console.log(state)
    localStorage.setItem('model', JSON.stringify(state))
    return Object.assign({}, state, {
      lastSaved: Date.now()
    })
  }

  if (action.type === 'LOADSTATE') {
    // replace the objects with the instantiation of the class
    console.log(localStorage.getItem('model'))
    if (localStorage.getItem('model')) {
      JSON.parse(localStorage.getItem('model')).form.map ((element, i) => {
        if(element._type === 'TextInput') {
          // load defaultProps, new props win
          console.log(Object.assign({}, ( new TextInput({...element}))))
          } else if(element._type === 'TextArea') {
          }
      })
      // return JSON.parse(localStorage.getItem('model'));
    }
  }


  return state;
}

export default formReducer;