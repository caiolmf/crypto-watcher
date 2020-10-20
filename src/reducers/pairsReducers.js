import {
  FETCH_PAIRS,
  FETCH_PAIRS_SUCCESS,
  FETCH_PAIRS_ERROR,
  UPDATE_PAIRS,
} from '../actions/pairsActions';

/** Helpers */
import arraySort from '../helpers/sort';

/** Initil states */
const pairsInitialState = {
  isFetching: true,
  pairs: [],
  filteredPairs: null,
  hasErrored: false,
};

/**
 * Handle initial rank
 */
const handleInitRank = (pairsData) => {
  /** Convert to array of objects */
  const pairsRank = Object.keys(pairsData).map((pair) => ({ pair, ...pairsData[pair] }));
  /** Sort items by percentChange and add a rank value */

  return arraySort(pairsRank, 'percentChange', 'asc').map((pair, index) => ({
    rank: index + 1,
    ...pair,
  }));
};

/**
 * Change the state based on the given action type and the action payload
 * @param {state} state - Actual state
 * @param {object} action - Action payload containing bew state information
 * @returns {object} Returns a object containing the state with modifications applied
 */
export default (state = pairsInitialState, action) => {
  switch (action.type) {
    case FETCH_PAIRS:
      return { ...state, isFetching: action.bool };

    case FETCH_PAIRS_SUCCESS:
      return {
        ...state,
        pairs: [...state.pairs, ...handleInitRank(action.pairs)],
      };

    case FETCH_PAIRS_ERROR:
      return { ...state, hasErrored: action.error };

    case UPDATE_PAIRS:
      return {
        ...state,
        filteredPairs: action.pairs,
      };
    default:
      return state;
  }
};
