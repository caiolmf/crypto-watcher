import {
  FETCH_COINS,
  FETCH_COINS_SUCCESS,
  FETCH_COINS_ERROR,
  FETCH_PAIRS,
  PAIRS_PAIRS_SUCCESS,
  PAIRS_PAIRS__ERROR,
} from '../actions/coinsActions';

/** Initil states */
const coinsInitialState = {
  isFetching: false,
  coins: {},
  hasErrored: false,
};

const pairsInitalState = {
  isFetching: false,
  pairs: {},
  hasErrored: false,
};

export const coinsReducer = (state = coinsInitialState, action) => {
  switch (action.type) {
    case FETCH_COINS:
      return { ...state, isFetching: action.bool };

    case FETCH_COINS_SUCCESS:
      return {
        ...state,
        coins: action.coins,
      };

    case FETCH_COINS_ERROR:
      return { ...state, hasErrored: action.error };

    default:
      return state;
  }
};
