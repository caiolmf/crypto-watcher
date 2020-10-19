import React from 'react';
import { mount, shallow } from 'enzyme';
import CoinRank from '../components/CoinsRank';

import { MOD_COINS_PAIRS } from '../__mocks__/coinsPairs';
import arraySort from '../helpers/sort';

describe('CoinRank', () => {
  it('should render correctly with no props', () => {
    const component = shallow(<CoinRank />);

    expect(component).toMatchSnapshot();
    expect(component.text().includes('No coins available')).toBe(true);

    component.unmount();
  });

  it('should render pair list with 10 items with given props', () => {
    const component = mount(<CoinRank pairs={MOD_COINS_PAIRS} />);

    expect(component).toMatchSnapshot();
    expect(component.find('[data-testid="coin-pair"]')).toHaveLength(10);

    component.unmount();
  });

  it('should render pair rank and the rank must be in asc order', () => {
    const component = mount(<CoinRank pairs={MOD_COINS_PAIRS} />);

    expect(component).toMatchSnapshot();
    expect(component.find('[data-testid="coin-rank"]').at(0).text()).toEqual('1');
    expect(component.find('[data-testid="coin-rank"]').at(9).text()).toEqual('10');

    component.unmount();
  });

  it('should order rank elements by rank on header label click', () => {
    const component = mount(<CoinRank pairs={MOD_COINS_PAIRS} />);

    /** Order the rank by the rank fild in desc order */
    const rankLabel = component.find('[data-testid="header-label"]').at(0);
    rankLabel.simulate('click');
    rankLabel.simulate('click');

    expect(component.find('[data-testid="coin-rank"]').at(0).text()).toEqual('20');
    expect(component.find('[data-testid="coin-rank"]').at(9).text()).toEqual('11');

    component.unmount();
  });

  it('should order rank elements by Change(24hrs) on header label click', () => {
    const component = mount(<CoinRank pairs={MOD_COINS_PAIRS} />);
    const changeMax = arraySort(MOD_COINS_PAIRS, 'percentChange', 'asc')[0].percentChange;
    const changeMin = arraySort(MOD_COINS_PAIRS, 'percentChange', 'desc')[0].percentChange;
    const changeLabel = component.find('[data-testid="header-label"]').at(6);

    /** Order the rank by the rank fild in desc order */
    changeLabel.simulate('click');
    expect(component.find('[data-testid="coin-change"]').at(0).children().text()).toEqual(
      changeMin
    );

    /** Order the rank by the rank fild in desc order */
    changeLabel.simulate('click');
    expect(component.find('[data-testid="coin-change"]').at(0).children().text()).toEqual(
      changeMax
    );

    component.unmount();
  });

  it('should navigate to the next rank page of elements and be disabled on end of list', () => {
    const component = mount(<CoinRank pairs={MOD_COINS_PAIRS} />);

    /** Order the rank by the rank fild in desc order */
    const nextBtn = component.find('[data-testid="next-page"]');
    const rankPages = Math.ceil(MOD_COINS_PAIRS.length / 10);

    let i = 1;
    while (i < rankPages) {
      i += 1;
      nextBtn.simulate('click');
    }

    expect(component.find('[data-testid="coin-rank"]').at(0).text()).toEqual('9');

    component.unmount();
  });
});
