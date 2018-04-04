import React from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';

const Reports = props => {
  return(
    <div>
      <div className="piechart-container">
      <PieChart {...props}/>
      </div>
      <div className="barchart-container">
      <BarChart {...props}/>
      </div>
    </div>
  );
}


export default Reports;
