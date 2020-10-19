import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCoins } from '../../actions/coinsActions';
import { fetchPairs } from '../../actions/pairsActions';

/** Used Components */
import Loader from '../../components/Loader';
import CoinsRank from '../../components/CoinsRank';

const App = ({ pairsFetcher, pairsLoading, pairs, coinsFetcher }) => {
  useEffect(() => {
    pairsFetcher();
    coinsFetcher();
  }, []);

  if (pairsLoading) return <Loader />;

  return (
    <div className="App">
      <CoinsRank pairs={pairs} />
    </div>
  );
};

const mapStateToProp = (state) => ({
  pairsLoading: state.pairsReducer.isFetching,
  pairs: state.pairsReducer.pairs,
});

const mapDispatchToProp = (dispatch) => ({
  pairsFetcher: () => dispatch(fetchPairs()),
  coinsFetcher: () => dispatch(fetchCoins()),
});

export default connect(mapStateToProp, mapDispatchToProp)(App);

App.propTypes = {
  coinsFetcher: PropTypes.func.isRequired,
  pairs: PropTypes.arrayOf(
    PropTypes.shape({
      pair: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      last: PropTypes.string.isRequired,
      lowestAsk: PropTypes.string.isRequired,
      highestBid: PropTypes.string.isRequired,
      percentChange: PropTypes.string.isRequired,
      baseVolume: PropTypes.string.isRequired,
      quoteVolume: PropTypes.string.isRequired,
      isFrozen: PropTypes.string.isRequired,
      high24hr: PropTypes.string.isRequired,
      low24hr: PropTypes.string.isRequired,
    })
  ).isRequired,
  pairsFetcher: PropTypes.func.isRequired,
  pairsLoading: PropTypes.bool.isRequired,
};