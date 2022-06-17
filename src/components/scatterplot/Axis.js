import classes from '../../styles/barChart.module.scss';

export const AxisBottom = ({ xScale, innerHeight, formatTick }) => {
  return xScale.ticks().map((tickValue) => (
    <g className={classes.ticks} key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} />
      <text style={{ textAnchor: 'middle' }} dy='.71em' y={innerHeight + 5}>
        {formatTick(tickValue)}
      </text>
    </g>
  ));
};

export const AxisLeft = ({ yScale,innerWidth, formatTick }) => {
  return yScale.ticks().map((tickValue) => (
    <g key={tickValue} className={classes.ticks} transform={`translate(0,${yScale(tickValue)})`}>
        <line x2={innerWidth}/>
        <text
        className={classes.ticks}
        style={{ textAnchor: 'end' }}
        dy='0.32em'
        x={-16}
        >
        {formatTick(tickValue)}
        </text>
    </g>
  ));
};
