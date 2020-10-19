import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCoins } from '../../services/poloniex';

const Exchange = ({ match }) => {
  const [selectedCoins, setSelectedCoins] = useState({ base: '', quote: '' });
  useEffect(() => {
    const coins = match.params.coin.split('_');

    setSelectedCoins({ base: coins[0], quote: coins[1] });
  }, []);
  return <div>{fasdfdsafd}</div>;
};

export default Exchange;
