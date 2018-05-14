import { utility } from '../utility';
import { address } from '../address';
import { comm } from '../comm';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { Form } from '../data/Form';
import { validateImport } from '../validation/val.index';

// initialize the store
const formReducer = (state, action) => {
  // if (localStorage.getItem('model')) {
  //   let resurrectedEntities =
  //     comm.unserialize((JSON.parse(localStorage.getItem('model'))))
  //   return { ...state, form: (resurrectedEntities) };

  //   state = {
  //     value: 0,
  //     form: new Form(defaultPropsFE.Form),
  //     app: {
  //       activeTab: 0
  //     }
  //   }
  // }

  if (typeof state === 'undefined') {
    // let resurrectedEntities = comm.unserialize(
    //   JSON.parse(localStorage.getItem('model'))
    // );
    // console.log(resurrectedEntities)

    state = {
      value: 0,
      form: new Form(defaultPropsFE.Form),
      app: {
        dateTime: null,
        activeTab: 0,
        currententity: [0, 0, 0],
        validations: true,
        dataDefinedValidationPane: true,
        // currententity: null
      },
    };
    return state;
  }
  /** entry point to validate form IF form entities exist */
  if (state !== 'undefined') {
    console.log('validateForm: ', validateImport(state.form));
  }

  if (action.type === 'INCREMENT') {
    return Object.assign({}, state, {
      value: state.value + 1,
    });
  }

  if (action.type === 'DECREMENT') {
    return Object.assign({}, state, {
      value: state.value - 1,
    });
  }

  if (action.type === 'ADD') {
    const result = utility.add(action.path, action.entity, state.form);
    if (validateImport(result).length === 0) {
      return Object.assign({}, state, {
        form: result,
      });
    }
  }

  if (action.type === 'REMOVE') {
    const result = utility.remove(action.path, state.form);
    if (validateImport(result).length === 0) {
      return Object.assign({}, state, {
        form: result,
      });
    }
  }

  if (action.type === 'MUTATE') {
    const initEntity = address.byPath(state.form, action.path);
    const update = utility.remove(action.path, state.form);
    const removedUpdate = Object.assign({}, state, {
      form: update,
    });
    const mutatedEntity = Object.assign({}, initEntity.properties(), action.properties);
    const result = utility.add(action.path, address.resurrectEntity(mutatedEntity), removedUpdate.form);

    // console.log(
    //   validateImport(result).length === 0,
    //   result
    //     .children()[0]
    //     .children()[0]
    //     .children()[2]
    //     .width()
    // );
    if (validateImport(result).length === 0) {
      return Object.assign({}, state, {
        form: result,
      });
    }
  }

  if (action.type === 'FORMMUTATE') {
    const mutatedEntity = state.form.setChildren(action.properties);

    return Object.assign({}, state, {
      form: mutatedEntity,
    });
  }

  if (action.type === 'SAVESTATE') {
    const serialized = comm.serialize(state.form);
    localStorage.setItem('model', JSON.stringify(serialized));
    return Object.assign({}, state, {
      lastSaved: Date.now(),
    });
  }

  if (action.type === 'LOADSTATE') {
    if (localStorage.getItem('model')) {
      const resurrectedEntities = comm.unserialize(JSON.parse(localStorage.getItem('model')));
      return { ...state, form: resurrectedEntities };
    }
    throw new Error('No items saved in local storage');
  }
  if (action.type === 'CHANGETAB') {
    return { ...state, app: { ...state.app, activeTab: action.tab } };
  }

  if (action.type === 'temporalStateChange') {
    return {
      ...state,
      app: {
        ...state.app,
        // ...action.payload,
        [Object.keys(action.payload)[0]]: action.payload[Object.keys(action.payload)[0]],
      },
    };
  }

  if (action.type === 'DTLOCALFILESSAVED') {
    return {
      ...state,
      app: { ...state.app, dtLocalFilesSaved: action.dateTime },
    };
  }
  return state;
};

export default formReducer;
