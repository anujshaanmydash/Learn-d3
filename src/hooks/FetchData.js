import {useState, useEffect} from 'react';
import {csv} from 'd3';

export const useBarGraphData = (csvUrl) =>{
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d['2020'];
      return d;
    };
    csv(csvUrl, row).then((d) => {
      setData(d.slice(0, 10));
    });
  }, [csvUrl]);
  return data;
}

export const useScatterPlotData = (csvUrl) => {
  const [data, setData] = useState(null);

  useEffect(()=>{
    const row = d =>{
      d.petal_length= +d.petal_length;
      d.petal_width= +d.petal_width;
      d.sepal_length= +d.sepal_length; 
      d.sepal_width= +d.sepal_width;
      return d;
    }
    csv(csvUrl,row).then(setData);
  },[csvUrl])
  return data;
}

export const useLineChartData = (csvUrl) =>{
  const [data, setData] = useState(null);

  useEffect(()=>{
    const row = (d) =>{
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
      return d;
    }
    csv(csvUrl, row).then(setData);
  },[csvUrl])
  return data
}