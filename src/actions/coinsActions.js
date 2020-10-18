import { getCoins, getCoinsPairs } from '../services/poloniex';

/**
 * Coins actions types
 */
export const FETCH_COINS = 'FETCH_COINS';
export const FETCH_COINS_SUCCESS = 'FETCH_COINS_SUCCESS';
export const FETCH_COINS_ERROR = 'FETCH_COINS_ERROR';
export const FETCH_PAIRS = 'FETCH_PAIRS';
export const PAIRS_PAIRS_SUCCESS = 'PAIRS_PAIRS_SUCCESS';
export const PAIRS_PAIRS__ERROR = 'PAIRS_PAIRS__ERROR';

/**
 * Coins fetch status action
 * @param {bool} bool - The fetch is occurring or not
 */
export const coinsFetching = (bool) => ({
  type: FETCH_COINS,
  bool,
});

/**
 * Coins fetch action
 * @param {object} coins - Object containing coins informations
 */
export const coinsFetchingSuccess = (coins) => ({
  type: FETCH_COINS_SUCCESS,
  coins,
});

/**
 * Coins fetch error action
 * @param {object} error - Object containing errors informations
 */
export const coinsFetchingErrored = (bool) => ({
  type: FETCH_COINS_ERROR,
  bool,
});

/**
 * Coins fetch Thunk
 * Manage coins fetch api calls
 * @param {object} dispatch - React Redux dispatcher
 */
export const fetchCoins = () =>(dispatch) => {
  dispatch(coinsFetching(true));

  getCoins()
    .then((coins) => dispatch(coinsFetchingSuccess(coins)))
    .then(() => dispatch(coinsFetching(false)))
    .catch((error) => dispatch(coinsFetchingErrored(error)));
};
