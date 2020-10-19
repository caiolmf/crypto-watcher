import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import store from '../store/store';
import Filters from '../components/Filters';

import { MOD_COINS_PAIRS } from '../__mocks__/coinsPairs';

const mockStore = configureStore([]);

describe('Filters', () => {
  let mockedStore;
  let component;

  beforeEach(() => {
    mockedStore = mockStore({
      ...store.getState(),
      pairsReducer: { ...store.getState().pairsReducer, pairs: MOD_COINS_PAIRS },
    });

    component = mount(
      <Provider store={mockedStore}>
        <Filters />
      </Provider>
    );
  });

  jest
    .spyOn(global, 'fetch')
    .mockImplementationOnce(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(MOD_COINS_PAIRS) })
    );

  it('should render correctly', () => {
    expect(component.text().includes('Search')).toBeTruthy();
  });

  it('should update filter state', () => {
    const minInput = component.find('#rank').at(0);
    const filterBtn = component.find('[data-testid="filter-btn"]');

    minInput.instance().value = 5;
    minInput.simulate('change', minInput);
    filterBtn.simulate('click');

    expect(mockedStore.getState().pairsReducer.pairs).toHaveLength(20);
  });
});
