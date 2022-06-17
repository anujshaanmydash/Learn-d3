import React, { useState, useEffect } from 'react';
import ConnectScatterPlot from '../../components/ConnectScatterPlot';
import { csv } from 'd3';

const ConnectedScatterPlot = () => {
  const url =
    'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv';
  const [data, setData] = useState();
  useEffect(() => {
    csv(url).then((d) => {
      setData(d);
    });
  }, []);

  return (
    <>{data ? <ConnectScatterPlot data={data} /> : <pre>Loading...</pre>}</>
  );
};

export default ConnectedScatterPlot;
