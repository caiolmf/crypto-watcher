import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, Line, Tooltip, CartesianGrid } from 'recharts';

/** Styled components */
import { SectionTitle, SmallButton } from '../StyledAssets';
import { ChartControllers } from './styledComponents';

const Chart = ({ data, interval }) => {
  const [hightVisibility, sethightVisibility] = useState(false);
  const [lowVisibility, setlowVisibility] = useState(false);

  return (
    <div>
      <SectionTitle>Price Chart</SectionTitle>
      <div>Selected period: {interval} hours</div>
      <div>Time window: 10 days</div>

      <LineChart
        width={900}
        height={600}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="solid" strokeOpacity="0.3" />
        <Line strokeWidth={2.5} type="monotone" dataKey="close" stroke="#8884d8" />
        {hightVisibility ? (
          <Line strokeWidth={2.5} type="monotone" dataKey="high" stroke="green" />
        ) : null}
        {lowVisibility ? (
          <Line strokeWidth={2.5} type="monotone" dataKey="low" stroke="red" />
        ) : null}
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
      <ChartControllers>
        <SmallButton
          type="button"
          selected={hightVisibility}
          onClick={() => sethightVisibility(!hightVisibility)}
        >
          {hightVisibility ? 'HIDE' : 'SHOW'} HIGH
        </SmallButton>
        <SmallButton
          type="button"
          selected={lowVisibility}
          onClick={() => setlowVisibility(!lowVisibility)}
        >
          {lowVisibility ? 'HIDE' : 'SHOW'} LOW
        </SmallButton>
      </ChartControllers>
    </div>
  );
};

export default Chart;
