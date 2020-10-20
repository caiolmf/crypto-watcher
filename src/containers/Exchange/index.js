import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchChartData } from '../../actions/chartActions';
import { fetchCoins } from '../../actions/coinsActions';

/** Components */
import Chart from '../../components/Chart';
import CoinCard from '../../components/CoinCard';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

/** Styled components */
import { SectionTitle } from '../../components/StyledAssets';
import { CoinsInfo, ExchangeContainer } from './styledComponents';

const Exchange = ({
  match,
  chartDataFetcher,
  chartData,
  chartIsFetching,
  coinsFetcher,
  coinIsFetching,
  coins,
}) => {
  const [selectedCoins, setSelectedCoins] = useState();
  const [startTime, setStartTime] = useState(864000);
  const [selectedInterval, setSelectedInterval] = useState(14400);
  const unixDateNow = Math.floor(new Date().getTime() / 1000);

  useEffect(() => {
    chartDataFetcher(match.params.coin, startTime, selectedInterval, unixDateNow);
    coinsFetcher();
    setSelectedCoins(match.params.coin.split('_'));
  }, []);

  if (chartIsFetching || coinIsFetching) return <Loader />;

  return (
    <div>
      <Header visible />
      <ExchangeContainer>
        <Chart data={chartData} interval={selectedInterval / 60 / 60} />
        <CoinsInfo>
          <SectionTitle>Selected Coins</SectionTitle>
          {selectedCoins
            ? selectedCoins.map((coin) => <CoinCard coin={coin} coinsData={coins} />)
            : null}
        </CoinsInfo>
      </ExchangeContainer>
    </div>
  );
};

const mapStateToProp = (state) => ({
  chartIsFetching: state.chartReducer.isFetching,
  chartData: state.chartReducer.chartData,
  coinsIsFetching: state.coinsReducer.isFetching,
  coins: state.coinsReducer.coins,
});

const mapDispatchToProp = (dispatch) => ({
  chartDataFetcher: (pair, startTime, selectedInterval, unixDateNow) =>
    dispatch(fetchChartData(pair, startTime, selectedInterval, unixDateNow)),
  coinsFetcher: () => dispatch(fetchCoins()),
});

export default connect(mapStateToProp, mapDispatchToProp)(Exchange);
