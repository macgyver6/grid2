import { batchActions, enableBatching, batchDispatchMiddleware } from 'redux-batched-actions';
import * as actions from '../actions/index';
import { validateImport } from '../validation/val.index';

const formMiddleware = ({ dispatch, getState }) => next => action => {
  // batchActions(dispatch(actions.remove([0, 0, 1])));
  // console.log(actions.remove);
  // toggleTodo(id)
  // console.log(getState());
  if (true) {
    console.log(action);
    return next(action);
  }
  // const { astronaut } = action;
  // let errors = astronautValidationErrors(astronaut)
  // if (!astronautIsValid(errors)) {
  //   dispatch(astronautValidationError(errors))
  // } else {
  //   next(action)
  // }
};

export default formMiddleware;

// const validateAttributeUpdateMiddleware = ({ dispatch, getState }) => next => action => {
//   // validations coming soon!
//   if (action.type !== "UPDATE_ASTRONAUT_ATTRIBUTES") {
//     return next(action)
//   }
//   const { newAttributes } = action;
//   const { astronaut } = getState();
//   let updatedAstronaut = { ...astronaut, ...newAttributes }
//   const attrName = Object.keys(newAttributes)[0]
//   action.errors = {
//     [attrName]: !astronautAttribueIsValid(updatedAstronaut, attrName)
//   }
//   next(action)
// };

// export default validateAttributeUpdateMiddleware;
