import React from 'react';


class MonthTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      years: []
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
        <div>
        <form>
          <select key={this.props.expenses.expense_id}
                  onChange={this.handleSelectChange}>

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

        <div>
          <form>
            <select key={this.props.expenses.expense_id}
                    onChange={this.handleYearChange}>
              {this.props.expenses.map((expense) => {
                let array = [];
                let cur_year = expense.expense_date.slice(0,4)

                const checkExist = (cur_year, arr) => {
                  let test = true;
                  arr.forEach((el) => {
                    if (el === cur_year) {
                      console.log(el, 'this is the element')
                      console.log(cur_year, 'this is the current year do you see')
                      test = false
                    } else {
                      test = true
                    }
                  })
                  return test;
                }
                console.log(checkExist(cur_year, array), 'THis is checkEXIST')
                if (checkExist(cur_year, array)) {
                  array.push(cur_year);
                }

                console.log(array, "THIS SHOULD SHOW OUR ARRAY");

                const array = [];
                const currentYear = (expense.expense_date.slice(0,4));
                array.push(currentYear);

                const checkExist = (el, arr) => {
                  array.forEach((el) => {
                    if (el === curYear) {

                    }
                  })
                }


                return <option>
                  {array}
                </option>
              })}
            </select>
          </form>
        </div>
      </div>
    );
  }

};


export default MonthTab;
