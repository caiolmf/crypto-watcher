import { combineReducers } from 'redux';
import pairsReducer from './pairsReducers'
import coinsReducer from './coinsReducers';

const rootReducer = combineReducers({
  pairsReducer,
  coinsReducer,
});

export default rootReducer;
