import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';


class PieChart extends Component {

componentDidMount(){
  this.props.getPChartData();
}

render(){
  return (
      <div className="chart">
        <Pie
          data={this.props.pieChartData}
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

}



export default PieChart;















