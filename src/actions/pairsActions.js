import { getCoinsPairs } from '../services/poloniex';

/**
 * Coins actions types
 */
export const FETCH_PAIRS = 'FETCH_PAIRS';
export const FETCH_PAIRS_SUCCESS = 'FETCH_PAIRS_SUCCESS';
export const FETCH_PAIRS_ERROR = 'FETCH_PAIRS__ERROR';
export const UPDATE_PAIRS = 'UPDATE_PAIRS';

/**
 * Coins Pairs fetch status action
 * @param {bool} bool - The fetch is occurring or not
 */
export const pairsFetching = (bool) => ({
  type: FETCH_PAIRS,
  bool,
});

/**
 * Coins pairs fetch action
 * @param {object} coins - Object containing coins informations
 */
export const pairsFetchingSuccess = (pairs) => ({
  type: FETCH_PAIRS_SUCCESS,
  pairs,
});

/**
 * Coins pairs fetch error action
 * @param {object} error - Object containing errors informations
 */
export const pairsFetchingErrored = (bool) => ({
  type: FETCH_PAIRS_ERROR,
  bool,
});

/**
 * Coins fetch Thunk
 * Manage coins fetch api calls
 * @param {object} dispatch - React Redux dispatcher
 */
export const fetchPairs = () => (dispatch) => {
  dispatch(pairsFetching(true));

  getCoinsPairs()
    .then((pairs) => dispatch(pairsFetchingSuccess(pairs)))
    .then(() => dispatch(pairsFetching(false)))
    .catch((error) => dispatch(pairsFetchingErrored(error)));
};

/**
 * Coins pairs update action
 * @param {object} pairs - Object containing pairs informations
 */
export const pairsUpdate = (pairs) => ({
  type: UPDATE_PAIRS,
  pairs,
});
