import { combineReducers } from 'redux';
import movieReducer from './data.reducer';

const rootReducer = combineReducers({
  movies: movieReducer
});

export default rootReducer;