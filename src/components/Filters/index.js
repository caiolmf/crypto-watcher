import React, { useState } from 'react';
import { connect } from 'react-redux';

import { pairsUpdate } from '../../actions/pairsActions';

/** Filters functions */
const filtersFunctions = {
  rank: (pairs, min, max) => pairs.filter((pair) => pair.rank >= min && pair.rank <= max),
};

const renderRangeFields = (filterState, handleInputs) => {
  const fields = Object.keys(filterState);
  fields.shift();

  return fields.map((field) => (
    <div key={field}>
      <label htmlFor="min-range">
        {field}
        <input
          type="number"
          id={`${field}`}
          value={filterState[field].min}
          onChange={(e) => handleInputs(e, 'min')}
          placeholder="Min"
        />
        <input
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
    rank: { min: '', max: '' },
    percentChange: { min: '', max: '' },
    baseVolume: { min: '', max: '' },
    quoteVolume: { min: '', max: '' },
  });

  const handleInputs = (event, type) => {
    const { id, value } = event.target;
    setFilterState({ ...filterState, [id]: { ...filterState[id], [type]: value } });
  };

  const handleFilters = () => {
    let filteredResult = pairs;

    Object.keys(filterState).forEach((filter) => {
      if (Number(filterState[filter].min) > 0) {
        filteredResult = filteredResult.filter(
          (result) => Number(result[filter]) >= Number(filterState[filter].min)
        );
      }
      if (Number(filterState[filter].max) > 0) {
        filteredResult = filteredResult.filter(
          (result) => Number(result[filter]) <= Number(filterState[filter].min)
        );
      }
    });

    pairsUpdater(filteredResult);
  };

  return (
    <div>
      <form>
        <label htmlFor="search">
          Search
          <input type="text" placeholder="Search" />
        </label>
        {renderRangeFields(filterState, handleInputs)}
      </form>
      <button data-testid="filter-btn" type="button" onClick={() => handleFilters()}>
        FILTER
      </button>
      <button type="button" onClick={() => pairsUpdater(null)}>
        RESET
      </button>
    </div>
  );
};

const mapStateToProp = (state) => ({
  pairs: state.pairsReducer.pairs,
});

const mapDispatchToProp = (dispatch) => ({
  pairsUpdater: (updatedPairs) => dispatch(pairsUpdate(updatedPairs)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Filters);
