import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';
import { utility } from '../utility';

const formReducer = (state, action) => {
  if (typeof state === 'undefined') {
    state = {
      value: 0,
      formSection: [],
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
      formSection: state.formSection.concat(action.formEntity)
    })
  }

  if (action.type === 'SAVESTATE') {
    let serialized = []
    state.formSection.forEach((element) => { serialized.push(element.properties()) })
    localStorage.setItem('model', JSON.stringify(serialized))
    return Object.assign({}, state, {
      lastSaved: Date.now()
    })
  }

  if (action.type === 'LOADSTATE') {
    if (localStorage.getItem('model')) {
      let resurrectedEntities = 
      JSON.parse(localStorage.getItem('model')).map(utility.resurrectEntity);

      return { ...state, formSection: resurrectedEntities };
    } else {
      throw 'No items saved in local storage'
    }
  }
  return state;
}

export default formReducer;