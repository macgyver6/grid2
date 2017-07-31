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
    let update
    let allSections = state.form.children().slice()
    if (action.formEntity._type !== 'FormSection') {
      allSections[[action.path[0]]] = utility.resurrectEntity(
        utility.add(
          action.formEntity,
          state.form.children()[action.path[0]],
          action.path.slice(1))
      )
      return Object.assign({}, state, {
        form: utility.resurrectEntity(state.form.setChildren(allSections))
      })
    } else {
      allSections[[action.path[0]]] = utility.resurrectEntity(
        utility.add(action.formEntity,
          state.form,
          action.path)
      )
      return Object.assign({}, state, {
        form: allSections[0]
      })
    }
  }

  if (action.type === 'REMOVEFORMENTITY') {
    let path = action.path;
    let update = utility.remove(
      state.form.children()[path[0]],
      path.slice(1)
    )
    let allSections = state.form.children().slice()
    if (path.length > 1) {
      allSections[[action.path[0]]] = update
      return Object.assign({}, state, {
        form: utility.resurrectEntity(state.form.setChildren(allSections))
      })
    } else {
      allSections.splice(action.path[action.path.length], 1)
      return Object.assign({}, state, {
        form: utility.resurrectEntity(state.form.setChildren(allSections))
      })
    }
  }

  if (action.type === 'SAVESTATE') {
    let serialized = utility.serialize(state.form);
    localStorage.setItem('model', JSON.stringify(serialized))
    return Object.assign({}, state, {
      lastSaved: Date.now()
    })
  }
  if (action.type === 'LOADSTATE') {
    if (localStorage.getItem('model')) {
      let resurrectedEntities =
        utility.unserialize((JSON.parse(localStorage.getItem('model'))))
      return { ...state, form: (resurrectedEntities) };
    } else {
      throw new Error('No items saved in local storage')
    }
  }
  return state;
}

export default formReducer;