import React from 'react';
import { Pie } from 'react-chartjs-2';
import MonthTab from './MonthTab';
import './PieChart.css'

//now that we used a ".then(res)" promise after the second fetch in App.js we are able to pass down the props of pieChartData into this component and allowing us to make this component stateless.
const PieChart = props => {


  return (
    <div className="chart">
      <MonthTab {...props}/>
      <Pie
        data={props.pieChartData}
        options={{
          // maintainAspectRatio: false
          // reponsive: true,
          title:{
            display: true,
            text: 'Expense Amounts',
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



export default PieChart;















