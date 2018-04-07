import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';


//now that we used a ".then(res)" promise after the second fetch in App.js we are able to pass down the props of pieChartData into this component and allowing us to make this component stateless.
const PieChart = props => {

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















