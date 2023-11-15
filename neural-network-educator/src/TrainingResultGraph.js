import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const TrainingResultGraph = ({ data, metric }) => {
  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
      <VictoryAxis
        // Customize the axis as needed, for example:
        tickFormat={(t) => `Epoch ${t}`}
      />
      <VictoryAxis
        dependentAxis
        // Customize the axis as needed
        tickFormat={(t) => metric === 'accuracy' ? `${t * 100}%` : t}
      />
      <VictoryLine
        data={data}
        x="epoch"
        y={metric}
        style={{
          data: { stroke: metric === 'accuracy' ? "#4CAF50" : "#f44336" }
        }}
      />
    </VictoryChart>
  );
};

export default TrainingResultGraph;
