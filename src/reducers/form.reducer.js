import { utility } from '../utility';
import { address } from '../address';
import { comm } from '../comm';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { Form } from '../data/Form';
import { validateImport } from '../validation/val.index';
import * as actions from '../actions/index';

// initialize the store
const formReducer = (state, action) => {
  console.log(state, action);
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
    const getLocalStorageForm = () => {
      if (localStorage.getItem('model')) {
        const resurrectedEntities = comm.unserialize(JSON.parse(localStorage.getItem('model')));
        return resurrectedEntities;
      } else {
        return new Form(defaultPropsFE.Form);
      }
    };

    // state = {
    //   value: 0,
    //   form: getLocalStorageForm(),
    //   app: {
    //     dateTime: null,
    //     activeTab: 0,
    //     currententity: address.byPath(getLocalStorageForm(), [0, 0, 0]) ? [0, 0, 0] : null,
    //     validations: true,
    //     dataDefinedValidationPane: true,
    //     gridWidth: null,
    //   },
    // };
    state = {
      value: 0,
      form: new Form(defaultPropsFE.Form),
      app: {
        dateTime: null,
        activeTab: 0,
        currententity: null,
        validations: true,
        dataDefinedValidationPane: true,
        gridWidth: null,
      },
    };

    return state;
  }
  /** entry point to validate form IF form entities exist */
  if (state !== 'undefined') {
    // console.log('validateForm: ', validateImport(state.form));
  }

  if (action.type === 'INCREMENT') {
    console.log(
      Object.assign({}, state, {
        value: state.value + 1,
      })
    );
    return Object.assign({}, state, {
      value: state.value + 1,
    });
  }

  if (action.type === 'DECREMENT') {
    return Object.assign({}, state, {
      value: state.value - 1,
    });
  }

  if (action.type === 'BATCH_ACTIONS') {
    const result = action.actionsArr;
    const resultingState2 = (state, actionsArr) =>
      // console.log(state);
      actionsArr.length >= 1
        ? resultingState2(formReducer(state, actionsArr[0]), actionsArr.slice(1, actionsArr.length))
        : state;
    // console.log(result);
    // console.log(resultingState2(state, result).form);

    // console.log(result);
    // if (validateImport(result).length === 0) {
    return Object.assign({}, state, {
      form: resultingState2(state, result).form,
    });
    // }
  }

  if (action.type === 'ADD') {
    const result = utility.add(action.path, action.entity, state.form);
    if (validateImport(result).length === 0) {
      return Object.assign({}, state, {
        form: result,
        app: Object.assign({}, state.app, { currententity: action.path }),
      });
    }
  }

  if (action.type === 'REMOVE') {
    const result = utility.remove(action.path, state.form);
    console.log(action, result);
    if (validateImport(result).length === 0) {
      return Object.assign({}, state, {
        form: result,
        app: Object.assign({}, state.app, { currententity: [0, 0, 0] }),
      });
    }
  }

  if (action.type === 'MUTATE') {
    console.log(action.properties);
    const initEntity = address.byPath(state.form, action.path);
    const update = utility.remove(action.path, state.form);
    const removedUpdate = Object.assign({}, state, {
      form: update,
    });
    const mutatedEntity = Object.assign({}, initEntity.properties(), action.properties);
    const result = utility.add(action.path, address.rehydrate(mutatedEntity), removedUpdate.form);

    console.log(mutatedEntity);
    if (validateImport(result).length === 0) {
      return Object.assign({}, state, {
        form: result,
      });
    }
  }

  if (action.type === 'MUTATEANDADD') {
    console.log(action);
    const initEntity = address.byPath(state.form, action.path);
    const update = utility.remove(action.path, state.form);
    const removedUpdate = Object.assign({}, state, {
      form: update,
    });
    const mutatedEntity = Object.assign({}, initEntity.properties(), action.properties);
    const result = utility.add(action.path, address.rehydrate(mutatedEntity), removedUpdate.form);

    // const entityToRemove = address.byPath(result, action.pathToDelete);
    // const entityRemoved = utility.remove(action.pathToDelete, result);
    const entityAdded = utility.add(action.pathToAdd, action.entityToAdd, result);

    // console.log(
    //   validateImport(result).length === 0,
    //   result
    //     .children()[0]
    //     .children()[0]
    //     .children()[2]
    //     .width()
    // );
    console.log(validateImport(entityAdded));
    if (validateImport(entityAdded).length === 0) {
      console.log('pass');
      // return Object.assign({}, state, {
      //   form: entityAdded,
      // });

      return Object.assign({}, state, {
        form: entityAdded,
        app: Object.assign({}, state.app, { currententity: action.pathToAdd }),
      });
    }
  }

  if (action.type === 'MUTATEADDREMOVE') {
    console.log(action);
    const initEntity = address.byPath(state.form, action.path);
    const update = utility.remove(action.path, state.form);
    const removedUpdate = Object.assign({}, state, {
      form: update,
    });
    console.log(removedUpdate);
    const mutatedEntity = Object.assign({}, initEntity.properties(), action.properties);
    const result = utility.add(action.path, address.rehydrate(mutatedEntity), removedUpdate.form);

    const entityAdded = utility.add(action.pathToAdd, action.entityToAdd, result);
    // const entityToRemove = (action.pathToDelete);
    const entityRemoved = utility.remove(action.pathToRemove, entityAdded);

    console.log(action.pathToAdd, action.entityToAdd);

    // console.log(
    //   validateImport(result).length === 0,
    //   result
    //     .children()[0]
    //     .children()[0]
    //     .children()[2]
    //     .width()
    // );
    console.log(validateImport(entityRemoved));
    if (validateImport(entityRemoved).length === 0) {
      console.log('pass');
      return Object.assign({}, state, {
        form: entityRemoved,
      });
    }
  }

  if (action.type === 'FORMMUTATE') {
    const mutatedEntity = state.form.setChildren(action.properties);
    const result = {
      ...state,
      form: new Form({
        ...state.form.properties(),
        [`${Object.keys(action.properties)}`]: Object.values(action.properties)[0],
      }),
    };
    return result;
  }

  if (action.type === 'SAVESTATE') {
    const serialized = comm.serialize(state.form);
    localStorage.setItem('model', JSON.stringify(serialized));
    return Object.assign({}, state, {
      lastSaved: Date.now(),
    });
  }

  if (action.type === 'LOADSTATE') {
    console.log(localStorage.getItem('model'));
    if (localStorage.getItem('model')) {
      const resurrectedEntities = comm.unserialize(JSON.parse(localStorage.getItem('model')));
      return { ...state, form: resurrectedEntities };
    }
    throw new Error('No items saved in local storage');
  }
  if (action.type === 'CHANGETAB') {
    console.log(action.tab);
    return { ...state, app: { ...state.app, activeTab: action.tab, currententity: action.tab } };
  }

  if (action.type === 'temporalStateChange') {
    console.log(action.payload);
    return {
      ...state,
      app: {
        ...state.app,
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

// console.log(formReducer({ type: 'increment' }));
// console.log(formReducer({ type: 'remove', path: [0, 0, 3] }));
