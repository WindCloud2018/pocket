import React from 'react';
import { Bar } from 'react-chartjs-2';
import YearTab from './YearTab';
import './BarChart.css';

const BarChart = (props) => {

    return (
      <div className="chart">
        <YearTab {...props}/>
        <Bar
          data={props.barChartData}
          options={{
            // maintainAspectRatio: false,
            // responsive: true,
            title:{
              display: true,
              text: 'Total Montly Expenses',
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          }}
          />
      </div>
    );
}



export default BarChart;
