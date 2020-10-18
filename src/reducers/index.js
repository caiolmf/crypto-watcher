import { combineReducers } from 'redux';
import { coinsReducer } from './coinsReducers';

const rootReducer = combineReducers({
  coinsReducer,
});

export default rootReducer;
