import React from 'react';
import { Bar } from 'react-chartjs-2';
import YearTab from './YearTab';

const BarChart = (props) => {

    return (
      <div className="chart">
        <YearTab {...props}/>
        <Bar
          data={props.barChartData}
          options={{
            // maintainAspectRatio: false
            title:{
              display: true,
              text: 'Total Montly Expenses',
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
          />
      </div>
    );
}



export default BarChart;
