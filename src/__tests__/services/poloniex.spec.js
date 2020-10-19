import { getCoins, getCoinsPairs } from '../../services/poloniex';
import COINS from '../../__mocks__/currencies';
import { COINS_PAIRS } from '../../__mocks__/coinsPairs';

describe('Poloniex API getCoins function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  jest
    .spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve(COINS) }))
    .mockImplementationOnce(() =>
      Promise.resolve({ ok: false, json: () => Promise.resolve({ error: 'API fetch failed.' }) })
    );

  test('should return coins informations', () => {
    return getCoins().then((coins) => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://poloniex.com/public?command=returnCurrencies'
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(coins).toStrictEqual(COINS);
    });
  });

  test('should return fetch error', () => {
    return getCoins().then((coins) => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://poloniex.com/public?command=returnCurrencies'
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(coins).toStrictEqual({ error: 'API fetch failed.' });
    });
  });
});

describe('Poloniex API getCoinsPairs function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  jest
    .spyOn(global, 'fetch')
    .mockImplementationOnce(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(COINS_PAIRS) })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({ ok: false, json: () => Promise.resolve({ error: 'API fetch failed.' }) })
    );

  test('should return coins pairs with coins volumes', () => {
    return getCoinsPairs().then((coins) => {
      expect(global.fetch).toHaveBeenCalledWith('https://poloniex.com/public?command=returnTicker');
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(coins).toStrictEqual(COINS_PAIRS);
    });
  });

  test('should return fetch error', () => {
    return getCoinsPairs().then((coins) => {
      expect(global.fetch).toHaveBeenCalledWith('https://poloniex.com/public?command=returnTicker');
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(coins).toStrictEqual({ error: 'API fetch failed.' });
    });
  });
});
