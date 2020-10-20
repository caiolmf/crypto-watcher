import { FETCH_COINS, FETCH_COINS_SUCCESS, FETCH_COINS_ERROR } from '../actions/coinsActions';

/** Initil states */
const coinsInitialState = {
  isFetching: false,
  coins: {},
  hasErrored: false,
};

/**
 * Change the coins state based on the given action type and the action payload
 * @param {state} state - Actual state
 * @param {object} action - Action payload containing bew state information
 * @returns {object} Returns a object containing the state with modifications applied
 */
export default (state = coinsInitialState, action) => {
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
