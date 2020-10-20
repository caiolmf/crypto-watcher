import { getChartData } from '../services/poloniex';

/**
 * chart data actions types
 */
export const FETCH_CHART = 'FETCH_CHART';
export const FETCH_CHART_SUCCESS = 'FETCH_CHART_SUCCESS';
export const FETCH_CHART_ERROR = 'FETCH_CHART_ERROR';

/**
 * chart data fetch status action
 * @param {bool} bool - The fetch is occurring or not
 */
export const chartDataFetching = (bool) => ({
  type: FETCH_CHART,
  bool,
});

/**
 * hart data  fetch action
 * @param {object} chartData - Object containing coins informations
 */
export const chartDataFetchingSuccess = (chartData) => ({
  type: FETCH_CHART_SUCCESS,
  chartData,
});

/**
 * chart data fetch error action
 * @param {object} error - Object containing errors informations
 */
export const chartDataFetchingErrored = (bool) => ({
  type: FETCH_CHART_ERROR,
  bool,
});

/**
 * Chart data Thunk
 * Manage chart data fetch api calls
 * @param {object} dispatch - React Redux dispatcher
 */
export const fetchChartData = (pair, startTime, selectedInterval, unixDateNow) => (dispatch) => {
  dispatch(chartDataFetching(true));
  console.log(selectedInterval);
  getChartData(pair, startTime, selectedInterval, unixDateNow)
    .then((chartData) => dispatch(chartDataFetchingSuccess(chartData)))
    .then(() => dispatch(chartDataFetching(false)))
    .catch((error) => dispatch(chartDataFetchingErrored(error)));
};
