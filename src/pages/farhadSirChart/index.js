import React from 'react'
import {Link} from 'react-router-dom'

const FarhadSirChart = () => {
  return (
    <div style={{width:'100%'}}>
      <h2>Table of content:</h2>
      <Link to='/farhadSirChart/speedDivideIndicator'>
        <h3>{`1) Speed Indicator with sectors and value`}</h3>
      </Link>
      <Link to='/farhadSirChart/line_chart'>
        <h3>{`2) Line Chart`}</h3>
      </Link>
      <Link to='/farhadSirChart/speed_indicator'>
        <h3>{`3) Speed Indicator`}</h3>
      </Link>
      <Link to='/farhadSirChart/stacked_barchart'>
        <h3>{`4) Stacked Bar Chart`}</h3>
      </Link>
      <Link to='/farhadSirChart/mekko_chart'>
        <h3>{`5) Mosaic or Mekko Chart`}</h3>
      </Link>
      <Link to='/farhadSirChart/function_chart'>
        <h3>{`6) Function Chart`}</h3>
      </Link>
      <Link to='/farhadSirChart/compare_values_chart'>
        <h3>{`7) Compare Values Chart`}</h3>
      </Link>
      <Link to='/farhadSirChart/waterfall_chart'>
        <h3>{`8) Waterfall chart`}</h3>
      </Link>
    </div>
  )
}

export default FarhadSirChart