import { combineReducers } from 'redux';
import pairsReducer from './pairsReducers';
import coinsReducer from './coinsReducers';
import chartReducer from './chartReducers';

const rootReducer = combineReducers({
  pairsReducer,
  coinsReducer,
  chartReducer,
});

export default rootReducer;
