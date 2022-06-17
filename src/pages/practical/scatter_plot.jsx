import { scaleLinear, extent, format } from 'd3';
import React from 'react';
import { AxisBottom, AxisLeft } from '../../components/scatterplot/Axis';
import Circles from '../../components/scatterplot/Circles';
import { useScatterPlotData } from '../../hooks/FetchData';
import classes from '../../styles/scatterPlot.module.scss';

const ScatterPlot = () => {
  const width = 1200;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 60, left: 90 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const csvUrl =
    'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv';

  const data = useScatterPlotData(csvUrl);
  console.log(data);

  if (!data) {
    return <pre>Loading....</pre>;
  }

  const xAccessor = (d) => d.petal_length;
  const xOffsetLabel = 'Petal Length';
  const yAccessor = (d) => d.sepal_length;
  const yOffsetLabel = 'Sepal Length';
  const formatTick = (tickValue) => format('.2s')(tickValue).replace('G', 'B');

  const xScale = scaleLinear()
    .domain(extent(data, xAccessor))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yAccessor))
    .range([0, innerHeight])
    .nice();

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Scatter Plot of Petals and Sepals</h3>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            formatTick={formatTick}
          />
          <text
            className={classes.axis_label}
            textAnchor='middle'
            transform={`translate(-50,${innerHeight / 2}),rotate(-90)`}
          >
            {xOffsetLabel}
          </text>
          <AxisLeft
            yScale={yScale}
            innerWidth={innerWidth}
            formatTick={formatTick}
          />
          <text
            className={classes.axis_label}
            textAnchor='middle'
            x={innerWidth / 2}
            y={innerHeight + 40}
          >
            {yOffsetLabel}
          </text>
          <Circles
            data={data}
            yScale={yScale}
            xScale={xScale}
            yAccessor={yAccessor}
            xAccessor={xAccessor}
            formatTick={format}
          />
        </g>
      </svg>
    </>
  );
};

export default ScatterPlot;
