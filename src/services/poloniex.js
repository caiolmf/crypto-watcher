/** Poloniex API Service */

import { w3cwebsocket as Websocket } from 'websocket';

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
const getCoins = () =>
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
    .then((coinsData) =>
      // Get coins pairs volumes
      fetch(`${poloniexHttp}?command=return24hVolume`)
        .then(handleErrors)
        .then((response) => response.json())
        .then((volumeData) => {
          // Add volumes to coins pairs
          const coins = coinsData;
          Object.keys(coins).forEach((coin) => {
            coinsData[coin].volumes = volumeData[coin];
          });
          // Return coins pairs with volumes

          return coins;
        })
        .catch((error) => ({ error }))
    )
    .catch((error) => ({ error }));

export { subscribe, getCoins, getCoinsPairs };
