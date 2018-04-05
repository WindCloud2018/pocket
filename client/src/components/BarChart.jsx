import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {

  componentDidMount(){
    this.props.getBChartData();
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.props.barChartData}
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

}



export default BarChart;
