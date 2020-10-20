import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCoins } from '../../actions/coinsActions';
import { fetchPairs } from '../../actions/pairsActions';

/** Used Components */
import Loader from '../../components/Loader';
import CoinsRank from '../../components/CoinsRank';
import Filters from '../../components/Filters';
import { Container, RankFilters } from './styledComponents';
import Header from '../../components/Header';

const App = ({ pairsFetcher, pairsLoading, pairs, filteredPairs, coinsFetcher }) => {
  useEffect(() => {
    pairsFetcher();
    coinsFetcher();
  }, []);

  if (pairsLoading) return <Loader />;

  return (
    <div className="App">
      <Header />
      <Container>
        <CoinsRank pairs={filteredPairs || pairs} />
        <RankFilters>
          <Filters />
        </RankFilters>
      </Container>
    </div>
  );
};

const mapStateToProp = (state) => ({
  pairsLoading: state.pairsReducer.isFetching,
  pairs: state.pairsReducer.pairs,
  filteredPairs: state.pairsReducer.filteredPairs,
});

const mapDispatchToProp = (dispatch) => ({
  pairsFetcher: () => dispatch(fetchPairs()),
  coinsFetcher: () => dispatch(fetchCoins()),
});

export default connect(mapStateToProp, mapDispatchToProp)(App);

App.propTypes = {
  coinsFetcher: PropTypes.func.isRequired,
  filteredPairs: PropTypes.arrayOf(
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
