import React from 'react';
import { Link } from 'react-router-dom';

const Practical = () => {
  return (
    <div>
      <h2>Table of Content:</h2>
      <Link to='/practical/face_emoji'>
        <p>{`1) Face emoji`}</p>
      </Link>
      <Link to='/practical/colors'>
        <p>{`2) Colors`}</p>
      </Link>
      <Link to='/practical/mouse_follower'>
        <p>{`3) Mouse Tracker`}</p>
      </Link>
      <Link to='/practical/bar_chart'>
        <p>{`4) Population Bar Chart (2020)`}</p>
      </Link>
      <Link to='/practical/scatter_plot'>
        <p>{`5) Scatter Plot`}</p>
      </Link>
      <Link to='/practical/line_chart'>
        <p>{`6) Line Chart`}</p>
      </Link>
      <Link to='/practical/line_chart1'>
        <p>{`7) Scatter Plot with Line Chart`}</p>
      </Link>
      <Link to='/practical/speed_indicator'>
        <p>{`8) Speed Indicator`}</p>
      </Link>
      <Link to='/practical/pie_chart'>
        <p>{`9) Pie Chart with tooltip`}</p>
      </Link>
      <Link to='/practical/area_chart'>
        <p>{`10) Area Chart`}</p>
      </Link>
      <Link to='/practical/bar_chart3'>
        <p>{`11) Bar Chart with transition`}</p>
      </Link>
      <Link to='/practical/stacked_barchart'>
        <p>{`12) Stacked Bar Chart`}</p>
      </Link>
      <Link to='/practical/stacked_areachart'>
        <p>{`13) Stacked Area Chart`}</p>
      </Link>
      <Link to='/practical/connected_scatterplot'>
        <p>{`14) Connected ScatterPlot with tooltip`}</p>
      </Link>
      <Link to='/practical/zoom_linechart'>
        <p>{`15) Zoomable Line Char`}</p>
      </Link>
    </div>
  );
};

export default Practical;
