import {
  curveBasis,
  curveLinear,
  format,
  lineRadial,
  range,
  scaleLinear,
  scaleOrdinal,
  // schemeCategory10,
  select,
  selectAll,
} from 'd3';
import React, { useEffect, useRef } from 'react';
import { useResizeObserver } from '../../hooks/resizeObserver';

const data = [
  { axis: 'Battery Life', value: 0.26 },
  { axis: 'Brand', value: 0.1 },
  { axis: 'Contract Cost', value: 0.3 },
  { axis: 'Design And Quality', value: 0.14 },
  { axis: 'Have Internet Connectivity', value: 0.22 },
  { axis: 'Large Screen', value: 0.04 },
  { axis: 'Price Of Device', value: 0.41 },
  { axis: 'To Be A Smartphone', value: 0.3 },
];

const RadarChart = () => {
  const wrapperSvg = useRef();
  const selectedSvg = useRef();
  const dimension = useResizeObserver(wrapperSvg);
  const margin = {
    top: 20,
    right: 20,
    left: 20,
    bottom: 20,
  };
  const maxValue = 1;
  const levels = 5;
  const roundStroke = true;

  const colors = scaleOrdinal().range(['#EDC951', '#CC333F', '#00A0B0']);

  const cfg = {
    width: 600, // width of circle
    height: 600, //height of circle
    margin: margin,
    levels: levels, //how many levels or inner circle
    maxValue: maxValue, //what is the value that biggest cricle represent
    labelFactor: 1.25, //how far label will be from outer circle
    wrapWidth: 60, //the number of pixel after which label will make new line
    opacityArea: 0.35, //the opacity of the area of blob
    dotRadius: 4, //the size of the colored circle of each blob
    opacityCircle: 0.1, //the opacity of the circle of blob
    strokeWidth: 2, //width of stroke around each blob
    roundStroke: roundStroke, //If true the area and stroke will follow round path
    color: colors, //color function
  };

  const drawRadarChart = () => {
    const allAxes = data.map((i, j) => {
      return i.axis;
    }); //name of each axis
    const total = allAxes.length; //the number of different axis
    const radius = Math.min(cfg.width / 2, cfg.height / 2); //radius of outmost circle
    const Format = format('%'); //Percentage formatting
    const angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

    const svg = select(selectedSvg.current);

    //scale of radius
    const rScale = scaleLinear()
      .range([0, radius])
      .domain([[0, cfg.maxValue]]);

    svg.selectAll('*').remove();
    //create the container svg and g
    svg
      .attr('width', cfg.width)
      .attr('height', cfg.height)
      .attr('class', 'radar');

    const g = svg
      .append('g')
      .attr(
        'transform',
        `translate(${cfg.width / 2 + cfg.margin.left},${
          cfg.height / 2 + cfg.margin.top
        })`
      );
    console.log(data);
    //Draw the circular grid
    const axisGrid = g.append('g').attr('class', 'axisWrapper'); //wrapper of grid and axes

    //Draw the background circle
    axisGrid
      .selectAll('.levels')
      .data(range(1, cfg.levels + 1).reverse())
      .join('circle')
      .attr('class', 'gridCircle')
      .attr('r', (d, i) => {
        return (radius / cfg.levels) * d;
      })
      .style('fill', '#CDCDCD')
      .style('stroke', '#CDCDCD')
      .style('fill-opacity', cfg.opacityCircle);

    //text indicating at what % each level is
    axisGrid
      .selectAll('.axislabel')
      .data(range(1, cfg.levels + 1).reverse())
      .join('text')
      .attr('class', 'axisLabel')
      .attr('x', 4)
      .attr('y', (d) => {
        return (-d * radius) / cfg.levels;
      })
      .attr('dy', '0.4em')
      .style('fill', '#737373')
      .style('font-size', '10px')
      .text((d, i) => {
        return Format((maxValue * d) / cfg.levels);
      });

    //Draw the axes

    //create the straight line radiating outward from center
    const axis = axisGrid
      .selectAll('.axis')
      .data(allAxes)
      .join('g')
      .attr('class', 'axis');

    //append  the lines
    axis
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => {
        return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
      })
      .attr('y2', (d, i) => {
        return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
      })
      .attr('class', 'line')
      .attr('stroke', 'white')
      .attr('stroke-width', '2px');

    //append the label at each axis
    axis
      .append('text')
      .attr('class', 'legend')
      .attr('font-size', '11px')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('x', (d, i) => {
        return (
          rScale(maxValue * cfg.labelFactor) *
          Math.cos(angleSlice * i - Math.PI / 2)
        );
      })
      .attr('y', (d, i) => {
        return (
          rScale(maxValue * cfg.labelFactor) *
          Math.cos(angleSlice * i - Math.PI / 2)
        );
      })
      .text((d) => {
        return d;
      });

    //Draw the radar chart blob
    //The radial line function
    const radarLine = lineRadial()
      .curve(curveLinear)
      .radius((d) => {
        return rScale(d.value);
      })
      .angle((d, i) => {
        return i * angleSlice;
      });

    if (cfg.roundStroke) {
      radarLine.curve(curveBasis);
    }

    //create wrapper for blob
    const blobWrapper = selectAll('.radarWrapper')
      .data(data)
      .join('g')
      .attr('class', 'radarWrapper');

    //Append the background
    blobWrapper
      .append('path')
      .attr('class', 'radarArea')
      .attr('d', (d, i) => {
        return radarLine(d);
      })
      .style('fill', (d, i) => {
        return cfg.color;
      })
      .style('fill-opacity', cfg.opacityArea)
      .on('mouseover', (d, i) => {
        //dim all blob
        selectAll('.radarArea')
          .transition()
          .duration(200)
          .style('fill-opacity', 0.1);

        //bring back the hover over blob
      })
      .on('mouseout', () => {
        selectAll('.radarArea')
          .transition()
          .duration(200)
          .style('fill-opacity', cfg.opacityArea);
      });

    //create the outlines
    blobWrapper
      .selectAll('.radarCircle')
      .data((d, i) => {
        return d;
      })
      .join('circle')
      .attr('r', cfg.dotRadius)
      .attr('cx', (d, i) => {
        return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
      })
      .attr('cy', (d, i) => {
        return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
      })
      .style('fill', (d, i, j) => {
        return cfg.color;
      })
      .style('fill-opacity', 0.8);

    //Append invisible circle of tooltip
  };

  useEffect(() => {
    if (!dimension) return;

    drawRadarChart();
    //eslint-disable-next-line
  }, [data, dimension]);

  return (
    <div ref={wrapperSvg}>
      <div ref={selectedSvg}></div>
    </div>
  );
};

export default RadarChart;
