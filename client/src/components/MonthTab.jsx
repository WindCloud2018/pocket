import React from 'react';
import './MonthTab.css';


class MonthTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      years: []
    }
    this.getYears = this.getYears.bind(this);
    this.checkExist = this.checkExist.bind(this);
  }

  checkExist(array, val) {
    return array.some((arrEle) => {
      return val === arrEle
    })
  }

/*pseudo code:
-we have an empty array.
-we want to iterate through the expenses and get the year for a single expense.
-if array.length === 0 push first year we see into empty array
-else if means after first condition is met run checkExist(yearArr, cur_year)
*/
  getYears() {
    let yearArr = [];
    this.props.expenses.forEach((expense) => {
      let cur_year = expense.expense_date.slice(0, 4);

      if (yearArr.length === 0) {
        yearArr.push(cur_year)
      }
      else if (!this.checkExist(yearArr, cur_year)) {
        yearArr.push(cur_year)
      }
    })
    this.setState({
      years: yearArr
    })
  }

  componentDidMount() {
    this.getYears();
  }

//e.target.value from select changes is passed into our callback function.


  render(){
  const date = new Date().toDateString();

    return(
      <div className="selector-container">
        <form className='selector-container-left'>
          <select key={this.props.expenses.expense_id}
                  value={this.props.currentMonth}
                  onChange={(e) => {this.props.handleSelectCall(e.target.value)}}>

          {/*Logic: we map through the months in state according to an index where if less than 9 we add 0 and + 1 else just add 1. January starts at index 0 */}
            {this.state.months.map((month, i) => {
              const index = i < 9 ? '0' + (i + 1) :
              (String(i + 1))
              return <option  key={i}
                              value={index}>
                {month}
              </option>
            }
              )}
          }
          }
          </select>
        </form>
          <form className="selector-container-right">
            <select key={this.props.expenses.expense_id}
                    value={this.props.currentYear}
                    onChange={(e) => {
                      this.props.handleSelectYearCall(e.target.value)
                    }}>
              {this.state.years.map((year, i) => {
                return <option  key={i}
                                value={year}>
                {year}
                </option>
              })}
            </select>
          </form>
      </div>
    );
  }

};


export default MonthTab;
