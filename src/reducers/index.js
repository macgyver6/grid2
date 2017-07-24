import { combineReducers } from 'redux';
import formReducer from './form.reducer';

const rootReducer = combineReducers({
  model: formReducer
});

export default rootReducer;