import { batchActions, enableBatching, batchDispatchMiddleware } from 'redux-batched-actions';
import * as actions from '../actions/index';
import { validateImport } from '../validation/val.index';
import formReducer from '../reducers/form.reducer';

const formMiddleware = ({ dispatch, getState }) => next => action => {
  // batchActions(dispatch(actions.remove([0, 0, 1])));
  // console.log(actions.remove);
  // toggleTodo(id)
  // console.log(getState());
  console.log(formReducer(getState().model, action).form);

  if (action.type === 'BATCH_ACTIONS') {
    const result = action.actionsArr;
    const resultingState2 = (state, actionsArr) =>
      actionsArr.length >= 1
        ? resultingState2(formReducer(state, actionsArr[0]), actionsArr.slice(1, actionsArr.length))
        : state;

    if (validateImport(resultingState2(getState().model, result).form).length === 0) {
      return next(action);
    } else {
      console.log('invalid form');
    }
  }
  //  if (validateImport(formReducer(getState().model, action).form).length === 0)
  else {
    return next(action);
  }
};

export default formMiddleware;
