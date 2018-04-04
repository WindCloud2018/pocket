import React from 'react';
import { Pie } from 'react-chartjs-2';


const PieChart = (props) => {
    return (
      <div className="chart">
        <Pie
          data={props.pieChartData}
          options={{
            // maintainAspectRatio: false
            title:{
              display: true,
              text: 'Expense Amounts',
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



export default PieChart;















