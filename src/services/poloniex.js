/** Poloniex API Service */

import { w3cwebsocket as Websocket } from 'websocket';
import arraySort from '../helpers/sort';

/** Helpers */

/** Poloniex API Endpoints */
const poloniexWebsocket = 'wss://api2.poloniex.com';
const poloniexHttp = 'https://poloniex.com/public';

/**
 * Subscribe to Poloniex websock channels:
 * 1002 | Public | Ticker Data
 * 1003 | Public | 24 Hour Exchange Volume
 * 1010	| Public | Heartbeat
 * @param {integer} channel - Websocket channel to subscribe
 * @returns {object} Websock object
 */
const subscribe = (channel) => {
  const socket = new Websocket(poloniexWebsocket);

  socket.onopen = () =>
    socket.send(
      JSON.stringify({
        command: 'subscribe',
        channel,
      })
    );

  return socket;
};

/** End of Websocket section */

/**
 * Handle API fetch erros
 * @param {Object} response - fetch response data
 * @returns {object} Returns the same response on success or throw an error
 */
const handleErrors = (response) => {
  if (!response.ok) {
    throw 'API fetch failed.';
  }

  return response;
};

/**
 * Get coins informations
 * @returns {object} Coins information object
 */
const getCoins = async () =>
  fetch(`${poloniexHttp}?command=returnCurrencies`)
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => ({ error }));

/**
 * Get coins pairs
 * @returns {object} Coins list with some informations
 */
const getCoinsPairs = async () =>
  fetch(`${poloniexHttp}?command=returnTicker`)
    .then(handleErrors)
    .then((response) => response.json())
    .then((pairsData) => pairsData)
    .catch((error) => ({ error }));

/**
 * Get chart data
 * @returns {object} Chart tick data
 */
const getChartData = async (pair, startTime, selectedInterval, unixDateNow) =>
  fetch(
    `${poloniexHttp}?command=returnChartData&currencyPair=${pair}&start=${
      unixDateNow - startTime
    }&end=${unixDateNow}&period=${selectedInterval}`
  )
    .then(handleErrors)
    .then((response) => response.json())
    .then((chartData) => chartData)
    .catch((error) => ({ error }));

export { subscribe, getCoins, getCoinsPairs, getChartData };
