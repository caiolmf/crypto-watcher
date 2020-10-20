import { FETCH_CHART, FETCH_CHART_SUCCESS, FETCH_CHART_ERROR } from '../actions/chartActions';

/** Initil states */
const chartInitialState = {
  isFetching: true,
  chartData: [],
  hasErrored: false,
};

/**
 * Change the state based on the given action type and the action payload
 * @param {state} state - Actual state
 * @param {object} action - Action payload containing bew state information
 * @returns {object} Returns a object containing the state with modifications applied
 */
export default (state = chartInitialState, action) => {
  switch (action.type) {
    case FETCH_CHART:
      return { ...state, isFetching: action.bool };

    case FETCH_CHART_SUCCESS:
      return {
        ...state,
        chartData: [
          ...state.chartData,
          ...action.chartData.map((data) => ({ ...data, date: new Date(data.date * 1000) })),
        ],
      };

    case FETCH_CHART_ERROR:
      return { ...state, hasErrored: action.error };

    default:
      return state;
  }
};
