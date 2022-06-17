import { scaleLinear, scaleTime, extent, timeFormat, format } from 'd3';
import React from 'react';
import Lines from '../../components/linechart/Lines';
import { AxisBottom, AxisLeft } from '../../components/scatterplot/Axis';
import { useLineChartData } from '../../hooks/FetchData';
import classes from '../../styles/scatterPlot.module.scss';

const LineChart = () => {
  const width = 1200;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 60, left: 90 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const csvUrl =
    'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

  const data = useLineChartData(csvUrl);
  console.log(data);

  if (!data) {
    return <pre>Loading....</pre>;
  }

  const xAccessor = (d) => d.timestamp;
  const xOffsetLabel = 'Time';
  const yAccessor = (d) => d.temperature;
  const yOffsetLabel = 'Temperature';
  const xAxisFormatTick = timeFormat('%a');
  const yAxisFormatTick = (tickValue) => format('.2s')(tickValue);

  const xScale = scaleTime()
    .domain(extent(data, xAccessor))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yAccessor))
    .range([innerHeight, 0])
    .nice();

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>
        Line chart shows max temperature with days
      </h3>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            formatTick={xAxisFormatTick}
          />
          <text
            className={classes.axis_label}
            textAnchor='middle'
            transform={`translate(-50,${innerHeight / 2}),rotate(-90)`}
          >
            {yOffsetLabel}
          </text>
          <AxisLeft
            yScale={yScale}
            innerWidth={innerWidth}
            formatTick={yAxisFormatTick}
          />
          <text
            className={classes.axis_label}
            textAnchor='middle'
            x={innerWidth / 2}
            y={innerHeight + 40}
          >
            {xOffsetLabel}
          </text>
          <Lines
            data={data}
            yScale={yScale}
            xScale={xScale}
            yAccessor={yAccessor}
            xAccessor={xAccessor}
          />
        </g>
      </svg>
    </>
  );
};

export default LineChart;
