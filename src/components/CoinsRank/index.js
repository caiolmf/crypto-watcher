import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

/** Helpers */
import arraySort from '../../helpers/sort';

/** Styled Components */
import { RankContainer, Pair, Grid, HeaderLabel, Label, RankControllers } from './styledComponents';

const rankHeaders = [
  { label: 'Rank', clicable: 'rank' },
  { label: 'Pairs', clicable: null },
  { label: 'Last Price', clicable: null },
  { label: 'Change(24hrs)', clicable: 'percentChange' },
  { label: 'Base Volume', clicable: 'baseVolume' },
  { label: 'Quote Volume', clicable: 'quoteVolume' },
  { label: 'Highest Bid', clicable: null },
  { label: 'Lower Ask', clicable: null },
  { label: 'Price (7d)', clicable: null },
];

const renderPair = (pair, history) => (
  <Pair key={pair.pair} onClick={() => history.push(`/exchange/${pair.pair}`)}>
    <div data-testid="coin-pair">
      <Grid>
        <Label>
          <span data-testid="coin-rank">{pair.rank}</span>
        </Label>
        <Label>{pair.pair.replace('_', '/')}</Label>
        <Label>{pair.last}</Label>
        <Label data-testid="coin-change">{pair.percentChange}</Label>
        <Label>{pair.baseVolume}</Label>
        <Label>{pair.quoteVolume}</Label>
        <Label>{pair.highestBid}</Label>
        <Label>{pair.lowestAsk}</Label>
      </Grid>
    </div>
  </Pair>
);

const CoinsRank = ({ pairs }) => {
  const [rankState, setRankState] = useState([]);
  const [sortState, setSortState] = useState({ sort: 'rank', order: 'asc' });
  const [pageState, setPageState] = useState({ initItem: 0, endItem: 10 });
  const history = useHistory();

  useEffect(() => {
    setRankState(pairs);
  }, [pairs]);

  const handleSortOrder = (sort) => {
    const order = sortState.order === 'asc' ? 'desc' : 'asc';

    setRankState(arraySort(rankState, sort, order));
    setSortState({ sort, order });
  };

  const handlePagination = (cmd) => {
    setPageState({
      initItem: cmd === 'next' ? pageState.endItem : pageState.initItem - 10,
      endItem: cmd === 'next' ? pageState.endItem + 10 : pageState.initItem,
    });
  };

  if (!pairs) return <h1>No coins available</h1>;

  return (
    <RankContainer>
      <Grid>
        {rankHeaders.map((header) => (
          <HeaderLabel
            key={header.label}
            data-testid="header-label"
            onClick={() => (header.clicable ? handleSortOrder(header.clicable) : null)}
          >
            {header.label}
          </HeaderLabel>
        ))}
      </Grid>

      {/* Render pairs on rank */}
      {rankState
        .slice(pageState.initItem, pageState.endItem)
        .map((pair) => renderPair(pair, history))}

      <RankControllers>
        <button
          data-testid="prev-page"
          type="button"
          onClick={() => handlePagination('prev')}
          disabled={pageState.endItem === 10}
        >
          PREVIOUS
        </button>
        <div>{`${pageState.endItem}/${rankState.length}`}</div>
        <button
          data-testid="next-page"
          type="button"
          onClick={() => handlePagination('next')}
          disabled={pageState.endItem >= rankState.length}
        >
          NEXT
        </button>
      </RankControllers>
    </RankContainer>
  );
};

export default CoinsRank;

CoinsRank.propTypes = {
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
};
