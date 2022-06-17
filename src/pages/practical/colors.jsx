import React, { useState, useEffect } from 'react';
import { csv, arc, pie } from 'd3';

const Colors = () => {
  const width = 1200;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;

  const [data, setData] = useState(null);
  const csvUrl =
    'https://gist.githubusercontent.com/anujshaanmydash/33bb3f9ff2d3418eff4ae3920983cd1b/raw/cssNameColorByAnuj.csv';

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  const pieArc = arc().innerRadius(0).outerRadius(width);

  if (data == null) {
    return <pre>Loading....</pre>;
  }

  const colorPie = pie().value(1);
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX},${centerY})`}>
        {colorPie(data).map((d) => (
          <path fill={d.data['RGB hex value']} d={pieArc(d)} />
        ))}

        {/* {data.map((d, index) => (
          <path
            fill={d['RGB hex value']}
            d={pieArc({
              startAngle: (index / data.length) * 2 * Math.PI,
              endAngle: ((index + 1) / data.length) * 2 * Math.PI,
            })}
          />
        ))} */}
      </g>
    </svg>
  );
};

export default Colors;
