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
    </div>
  )
}

export default FarhadSirChart