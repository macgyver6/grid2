import { combineReducers } from 'redux';
import formReducer from './form.reducer';
console.log(formReducer);
const rootReducer = combineReducers({
  model: formReducer,
});

export default rootReducer;
