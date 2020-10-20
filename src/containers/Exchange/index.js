import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchChartData } from '../../actions/chartActions';
import Chart from '../../components/Chart';
import CoinCard from '../../components/CoinCard';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

/** Styled components */
import { SectionTitle } from '../../components/StyledAssets';
import { CoinsInfo, ExchangeContainer } from './styledComponents';

const Exchange = ({ match, chartDataFetcher, chartData, isFetching, coins }) => {
  const [selectedCoins, setSelectedCoins] = useState({ base: '', quote: '' });
  const [startTime, setStartTime] = useState(864000);
  const [selectedInterval, setSelectedInterval] = useState(14400);
  const unixDateNow = Math.floor(new Date().getTime() / 1000);

  useEffect(() => {
    chartDataFetcher(match.params.coin, startTime, selectedInterval, unixDateNow);
    setSelectedCoins(match.params.coin.split('_'));
  }, []);

  if (isFetching) return <Loader />;

  return (
    <div>
      <Header visible />
      <ExchangeContainer>
        <Chart data={chartData} interval={selectedInterval / 60 / 60} />
        <CoinsInfo>
          <SectionTitle>Selected Coins</SectionTitle>
          {selectedCoins.map((coin) => (
            <CoinCard coin={coin} />
          ))}
        </CoinsInfo>
      </ExchangeContainer>
    </div>
  );
};

const mapStateToProp = (state) => ({
  isFetching: state.chartReducer.isFetching,
  chartData: state.chartReducer.chartData,
  coins: state.coinsReducer.coins,
});

const mapDispatchToProp = (dispatch) => ({
  chartDataFetcher: (pair, startTime, selectedInterval, unixDateNow) =>
    dispatch(fetchChartData(pair, startTime, selectedInterval, unixDateNow)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Exchange);
