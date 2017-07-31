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
    if (action.formEntity._type !== 'FormSection') {
      update = utility.resurrectEntity((
        utility.add(
          action.formEntity,
          state.form.children()[action.path[0]],
          action.path.slice(1))
      ))
    } else {
      update = utility.resurrectEntity((
        utility.add(action.formEntity,
          state.form,
          action.path)
      ))
    }

    let allSections = state.form.children().slice()
    allSections[[action.path[0]]] = update

    if (action.formEntity._type !== 'FormSection') {
      return Object.assign({}, state, {
        form: utility.resurrectEntity(state.form.setChildren(allSections))
      })
    } else {
      return Object.assign({}, state, {
        form: allSections[0]
      })
    }
  }

  if (action.type === 'SAVESTATE') {
    let serialized = utility.serialize(state.form);
    console.log(serialized)
    localStorage.setItem('model', JSON.stringify(serialized))
    return Object.assign({}, state, {
      lastSaved: Date.now()
    })
  }
  if (action.type === 'LOADSTATE') {
    if (localStorage.getItem('model')) {

      let resurrectedEntities =
        utility.unserialize((JSON.parse(localStorage.getItem('model')).children))

      return { ...state, form: utility.resurrectEntity(state.form.setChildren(resurrectedEntities)) };
    } else {
      throw new Error('No items saved in local storage')
    }
  }
  return state;
}

export default formReducer;