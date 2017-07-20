import { combineReducers } from 'redux';
import formReducer from './form.reducer';

const rootReducer = combineReducers({
  formData: formReducer
});

export default rootReducer;