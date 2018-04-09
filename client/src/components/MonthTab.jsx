import React from 'react';


class MonthTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    }
  }



  // handleSelectChange(e){
  //   this.props.handleSelectCall();
  // }



  render(){
    const date = new Date().toDateString();
    return(
      <div>
        <div>
          <h1> {date} </h1>
        </div>
        <form>
          <select key={this.props.expenses.expense_id}
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
