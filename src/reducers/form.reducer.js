import { utility } from '../utility';
import { address } from '../address';
import { comm } from '../comm';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { Form } from '../data/Form';

// initialize the store
const formReducer = (state, action) => {
  if (typeof state === 'undefined') {
    state = {
      value: 0,
      form: new Form(defaultPropsFE.Form),
      app: {
        activeTab: 0
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

  if (action.type === 'ADD') {
    let result =
      utility.add (
        action.path,
        action.entity,
        state.form
        )
    return Object.assign({}, state, {
      form: result
    })
  }

  if (action.type === 'REMOVE') {
    console.log(state.form,
      action.path)
    let update = utility.remove (
      action.path,
      state.form
    )
    return Object.assign({}, state, {
      form: update
    })
  }

  if (action.type === 'MUTATE') {
    const initEntity = address.byPath(state.form, action.path)
    let update = utility.remove (
      action.path,
      state.form )
    const removedUpdate = Object.assign({}, state, {
      form: update
    })
    console.log(initEntity)
    let mutatedEntity = Object.assign({}, initEntity.properties(),
      action.properties
    )
    let result =
      utility.add(
        action.path,
        address.resurrectEntity(mutatedEntity),
          removedUpdate.form
      )
    return Object.assign({}, state, {
      form: result
    })
  }

  if (action.type === 'FORMMUTATE') {
    const initEntity = state.form

    let mutatedEntity = state.form.setChildren(action.properties)

    return Object.assign({}, state, {
      form: mutatedEntity
    })
  }

  if (action.type === 'SAVESTATE') {
    let serialized = comm.serialize(state.form);
    localStorage.setItem('model', JSON.stringify(serialized))
    return Object.assign({}, state, {
      lastSaved: Date.now()
    })
  }

  if (action.type === 'LOADSTATE') {
    if (localStorage.getItem('model')) {
      let resurrectedEntities =
        comm.unserialize((JSON.parse(localStorage.getItem('model'))))
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