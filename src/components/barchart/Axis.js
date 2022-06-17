import classes from '../../styles/barChart.module.scss';

export const AxisBottom = ({ xScale, innerHeight, formatTick }) => {
  return xScale.ticks().map((tickValue) => (
    <g className={classes.ticks} key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} />
      <text style={{ textAnchor: 'middle' }} dy='.71em' y={innerHeight + 3}>
        {formatTick(tickValue)}
      </text>
    </g>
  ));
};

export const AxisLeft = ({ yScale }) => {
  return yScale.domain().map((tickValue) => (
    <text
      className={classes.ticks}
      key={tickValue}
      style={{ textAnchor: 'end' }}
      dy='0.32em'
      x={-5}
      y={yScale(tickValue) + yScale.bandwidth() / 2}
    >
      {tickValue}
    </text>
  ));
};
