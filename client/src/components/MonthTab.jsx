import React from 'react';


class MonthTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

//e.target.value from select changes is passed into our callback function.
  handleSelectChange(e){
    this.props.handleSelectCall(e.target.value);
  }

  render(){
  const date = new Date().toDateString();

    return(
      <div>
        <div>
          <h1> {date} </h1>
        </div>
        <form>
          <select key={this.props.expenses.expense_id}
                  onChange={this.handleSelectChange}
          >
          {/*Logic: we map through the months in state according to an index where if less than 9 we add 0 and + 1 else just add 1. January starts at index 0 */}
            {this.state.months.map((month, i) => {
              const index = i < 9 ? '0' + (i + 1) :
              (String(i + 1))
              return <option value={index}>
                {month}
              </option>
            }
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
