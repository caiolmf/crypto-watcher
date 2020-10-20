import React from 'react';
import { connect } from 'react-redux';

/** Styled components */
import { Card, CardContent, CardTitle } from './styledComponents';

const CoinCard = ({ coin, coins }) => {
  if (!coins) return null;

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
        <h1>{coins[coin].name}</h1>
        <h2>{coins[coin].humanType}</h2>
      </CardTitle>
      <CardContent>
        <div>
          <strong>Coin Type:</strong> {coins[coin].currencyType}
        </div>
        <div>
          <strong>Fee:</strong> {coins[coin].txFee}
        </div>
      </CardContent>
    </Card>
  );
};

const mapStateToProp = (state) => ({
  coins: state.coinsReducer.coins,
});

export default connect(mapStateToProp)(CoinCard);
