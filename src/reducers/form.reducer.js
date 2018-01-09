import { utility } from '../utility';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { Form } from '../data/Form';

// initialize the store
const formReducer = (state, action) => {
  if (typeof state === 'undefined') {
    state = {
      value: 0,
      form: new Form(defaultPropsFE.Form),
      app: {
        activeTab: 1
      }
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
    let result =
      utility.add (
        action.formEntity,
        action.section || state.form,
        action.path )
    return Object.assign({}, state, {
      form: result
    })
  }

  if (action.type === 'REMOVEFORMENTITY') {
    let update = utility.remove (
      state.form,
      action.path )
      console.log(update)
    return Object.assign({}, state, {
      form: update
    })
  }

  if (action.type === 'MUTATEFORMENTITY') {
    const initEntity = utility.findEntityByPath(state.form, action.path)
    let update = utility.remove (
      action.section || state.form,
      action.path )
    const removedUpdate = Object.assign({}, state, {
      form: update
    })
    let mutatedEntity = Object.assign({}, initEntity.properties(),
      action.properties
    )
    let result =
      utility.add(
        utility.resurrectEntity(mutatedEntity),
        removedUpdate.form,
        action.path)
        console.log(result)
    return Object.assign({}, state, {
      form: result
    })
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
  if (action.type === 'CHANGETAB') {
    return Object.assign({}, state, { app: { activeTab: action.tab}})
  }
  return state;
}

export default formReducer;