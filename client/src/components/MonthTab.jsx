import React from 'react';


class MonthTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      thisMonth: ''
    }
    // this.getCurrentMonth = this.getCurrentMonth.bind(this);
  }

  // componentDidMount(){
  //   console.log(this.props.expenses, 'reports expenses went through');
  //   console.log(this.getCurrentDate, 'current date went through')
  //   this.getCurrentMonth();
  // }

  // handleSelectChange(e){
  //   this.props.handleSelectCall();
  // }

  getCurrentMonth() {
    const currentMonth = new Date().toDateString().slice(3,7);
    this.setState({
      thisMonth: currentMonth
    })
  }


  render(){
    // const date = new Date().toDateString();
    const date = new Date().getMonth();
    return(
      <div>
        <div>
          <h1> {date + 1} </h1>
        </div>
        <form>
          <select
                  value={this.state.month}
                  onChange={this.handleSelectChange}
          >
            {this.state.months.map((month) =>
              <option value={this.state.month}>
              {month}
              </option>
              )}
          }
          }
          </select>
        </form>
      </div>
    );
  }

};


export default MonthTab;
