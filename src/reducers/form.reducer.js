import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';
import { utility } from '../utility';
import { defaultPropsFE } from '../constants/defaultPropsFE'

const formReducer = (state, action) => {
  if (typeof state === 'undefined') {
    state = {
      value: 0,
      form: (defaultPropsFE.Form)
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
    console.log('action.formEntity ', action.formEntity, 'action.path ', action.path)
    utility.add(action.formEntity, action.path, state.form)
    // return Object.assign({}, state, {
    //   form: state.form.concat(action.formEntity)
    // })
  }

  if (action.type === 'SAVESTATE') {
    let serialized = []
    state.form.forEach((element) => { serialized.push(element.properties()) })
    localStorage.setItem('model', JSON.stringify(serialized))
    return Object.assign({}, state, {
      lastSaved: Date.now()
    })
  }

  if (action.type === 'LOADSTATE') {
    if (localStorage.getItem('model')) {
      let resurrectedEntities =
        JSON.parse(localStorage.getItem('model')).map(utility.resurrectEntity);

      return { ...state, form: resurrectedEntities };
    } else {
      throw 'No items saved in local storage'
    }
  }
  return state;
}

export default formReducer;