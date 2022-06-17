import React from 'react';
import { scaleBand, scaleLinear, max, format } from 'd3';
import { useBarGraphData } from '../../hooks/FetchData';
import { AxisBottom, AxisLeft } from '../../components/barchart/Axis';
import Bars from '../../components/barchart/Bars';

const BarChart = () => {
  const width = 1200;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 20, left: 200 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const csvUrl =
    'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

  const data = useBarGraphData(csvUrl);

  if (!data) {
    return <pre>Loading ...</pre>;
  }

  const yAccessor = (d) => d.Country;
  const xAccessor = (d) => d.Population * 1000;
  const formatTick = (tickValue) => format('.2s')(tickValue).replace('G', 'B');

  const yScale = scaleBand()
    .domain(data.map(yAccessor))
    .range([0, innerHeight])
    .paddingInner(0.1);

  const xScale = scaleLinear()
    .domain([0, max(data, xAccessor)])
    .range([0, innerWidth]);

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>
        United Nation Popultaion bar of year 2020
      </h3>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            formatTick={formatTick}
          />
          <AxisLeft yScale={yScale} />
          <Bars
            data={data}
            yScale={yScale}
            xScale={xScale}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            formatTick={formatTick}
          />
        </g>
      </svg>
    </>
  );
};

export default BarChart;
