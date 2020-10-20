import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { pairsUpdate } from '../../actions/pairsActions';
import { Input, SearchBar, SectionTitle, SmallButton } from '../StyledAssets';

const renderRangeFields = (filterState, handleInputs) => {
  const fields = Object.keys(filterState);
  fields.shift();

  return fields.map((field) => (
    <div key={field}>
      <label htmlFor="min-range">
        {filterState[field].label}
        <Input
          type="number"
          id={`${field}`}
          value={filterState[field].min}
          onChange={(e) => handleInputs(e, 'min')}
          placeholder="Min"
        />
        <Input
          type="number"
          id={field}
          value={filterState[field].max}
          onChange={(e) => handleInputs(e, 'max')}
          placeholder="Max"
        />
      </label>
    </div>
  ));
};

const Filters = ({ pairs, pairsUpdater }) => {
  const [filterState, setFilterState] = useState({
    query: '',
    rank: { label: 'Rank', min: '', max: '' },
    percentChange: { label: 'Change (24hrs)', min: '', max: '' },
    baseVolume: { label: 'Base Volume', min: '', max: '' },
    quoteVolume: { label: 'Quote Volume', min: '', max: '' },
  });

  const handleInputs = (event, type) => {
    const { id, value } = event.target;

    if (id === 'query') return setFilterState({ ...filterState, query: value });

    return setFilterState({ ...filterState, [id]: { ...filterState[id], [type]: value } });
  };

  const handleFilters = () => {
    let filteredResult = pairs;

    Object.keys(filterState).forEach((filter) => {
      if (filter === 'query') {
        filteredResult = filteredResult.filter((result) =>
          result.pair.includes(filterState[filter].toUpperCase())
        );
      }
      if (filter !== 'query' && Number(filterState[filter].min) > 0) {
        filteredResult = filteredResult.filter(
          (result) => Number(result[filter]) >= Number(filterState[filter].min)
        );
      }
      if (filter !== 'query' && Number(filterState[filter].max) > 0) {
        filteredResult = filteredResult.filter(
          (result) => Number(result[filter]) <= Number(filterState[filter].min)
        );
      }
    });

    return pairsUpdater(filteredResult);
  };

  return (
    <div>
      <SectionTitle>Filters</SectionTitle>
      <form>
        <SearchBar
          type="text"
          id="query"
          placeholder="Search"
          value={filterState.query}
          onChange={(e) => handleInputs(e, 'query')}
        />
        {renderRangeFields(filterState, handleInputs)}
      </form>
      <SmallButton data-testid="filter-btn" type="button" onClick={() => handleFilters()}>
        FILTER
      </SmallButton>
      <SmallButton type="button" onClick={() => pairsUpdater(null)}>
        RESET
      </SmallButton>
    </div>
  );
};

Filters.propTypes = {
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
  pairsUpdater: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => ({
  pairs: state.pairsReducer.pairs,
});

const mapDispatchToProp = (dispatch) => ({
  pairsUpdater: (updatedPairs) => dispatch(pairsUpdate(updatedPairs)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Filters);
