import React from 'react';
import { connect } from 'react-redux';

/** Styled components */
import { Card, CardContent, CardTitle } from './styledComponents';

const CoinCard = ({ coin, coinsData }) => {

  if (!Object.keys(coinsData).length) return <p>Coins info loading...</p>;

  return (
    <Card>
      {/* <img
        src={`https://raw.githubusercontent.com/dziungles/cryptocurrency-logos/master/coins/32x32/${coins[
          coin
        ].name
          .toLowerCase()
          .replace(' ', '-')}.png`}
        alt="Coin icon"
      /> */}
      <CardTitle>
        <h1>{coinsData[coin].name}</h1>
        <h2>{coinsData[coin].humanType}</h2>
      </CardTitle>
      <CardContent>
        <div>
          <strong>Coin Type:</strong> {coinsData[coin].currencyType}
        </div>
        <div>
          <strong>Fee:</strong> {coinsData[coin].txFee}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinCard;
