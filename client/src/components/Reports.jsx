import React from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';

const Reports = props => {
  console.log({...props}, 'this is from reports')
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
