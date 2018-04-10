import React from 'react';

class YearTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      years: []
    }
    this.getYears = this.getYears.bind(this);
    this.checkIfExist = this.checkIfExist.bind(this);
  }


  //.some() will sort through an array and break down the array into its single elements and if the condition where value parameter is equal to the ele  paramenter it will return true.
  checkIfExist(array, value){
    return array.some((ele) => {
      return ele === value
    })
  }

//in get Years method the initial if statement will push the first year we see into the empty array. when condition is broken we check for else if where if !checkIfExist we add the elements that never existed in array1.
  getYears() {
    let year_arr = [];
    this.props.expenses.forEach((expense) => {
      let curr_year = expense.expense_date.slice(0,4);
      if (year_arr.length === 0) {
        year_arr.push(curr_year);
      }
      else if(!this.checkIfExist(year_arr, curr_year)) {
        year_arr.push(curr_year)
      }
    })
    this.setState({
      years: year_arr
    })
  }

  componentDidMount(){
    this.getYears();
  }

  render(){
    return(
      <div className="year-select-container">
        <form>
          <select value={this.props.currentYear}
                  onChange={(e) => {
                  this.props.handleSelectYearCall(e.target.value)}}>
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

}


export default YearTab;
