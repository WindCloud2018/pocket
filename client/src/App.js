import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import './App.css';
import Reports from './components/Reports';


class App extends Component {
  // Initialize state
  constructor() {
    super();
    this.state = {
      currentMonth: '',
      currentYear: '',
      currentDate: '',
      expenses: null,
      categories: null,
      dataLoaded: false,
      pieChartData: {},
      barChartData: {}
    }
    this.getExpenses = this.getExpenses.bind(this);
    this.expenseCreate = this.expenseCreate.bind(this);
    this.expenseDelete = this.expenseDelete.bind(this);
    this.expenseEdit = this.expenseEdit.bind(this);
    this.handleSelectCall = this.handleSelectCall.bind(this);
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getCategories();
    this.getExpenses();
    this.getCurrentMonth();
    this.getCurrentYear();
    this.getCurrentDate();
  }


//getMonth() starts in index 0, plus one sets months to norm.
  getCurrentMonth() {
    const current = new Date().getMonth();
    let newCurrent = current + 1
    if (newCurrent < 10) {
      newCurrent = '0' + newCurrent;
    }
    console.log(newCurrent, "THIS IS CURRENT MONTH")
    this.setState({
      currentMonth: newCurrent
    });
  }

  //get current year
  getCurrentYear(){
    const currYear = new Date().getFullYear().toString();
    console.log(currYear, 'THIS IS THE CURRENT YEAR')
    this.setState({
      currentYear: currYear
    })
  }

 getCurrentDate(){
    const currYear = new Date().getFullYear().toString();
    const current = new Date().getMonth();
    let newCurrent = current + 1
    if (newCurrent < 10) {
      newCurrent = '0' + newCurrent;
    }
    const totalDate = currYear + newCurrent;
    console.log(totalDate, "This is the current date you see it??");
    this.setState({
      currentDate: totalDate
    })
  }


  getCategories() {
    fetch('/api/categories')
      .then(res => res.json())
      .then((res) => {
        this.setState({
          categories: res.data.categories
        });
      })
      .catch(err => console.log(err));
  }

//when getting PChart and BChart Data I originally thought I had to run both get methods in categories and expenses but we actually dont have too. Once second fetch is committed this will run the getCharts methods and our setState of chartData will be initiated.
  getExpenses() {
    fetch('/api/expenses')
      .then(res => res.json())
      .then((res) => {
        this.setState({
          expenses: res.data.expenses,
          dataLoaded: true
        });
      })
      .then(res => {
        this.getPChartData();
        this.getBChartData();
      })
      .catch(err => console.log(err));
  }

  expenseCreate(event, data) {
    event.preventDefault();
    fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(res => {
        this.getExpenses();
      });
  }

  expenseEdit(event, data, id) {
    event.preventDefault();
    const rootUrl = window.location.origin;
    const pathUrl = `/api/expenses/${id}`;
    const newUrl = rootUrl.concat(pathUrl);
    fetch(newUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(res => {
        this.getExpenses();
      });
  }

  expenseDelete(id) {
    const rootUrl = window.location.origin;
    const pathUrl = `/api/expenses/${id}`;
    const newUrl = rootUrl.concat(pathUrl);
    fetch(newUrl, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => {
      this.getExpenses();
    });
  }

  handleSelectCall(value){
    this.setState({
      currentMonth: value
    }, () => {
      this.getPChartData();
    })
  }

//this pie chart data will be passed into Reports Component
  getPChartData(){
  const categoryData = [];
  this.state.categories.map((category) => {
    categoryData.push(category.category);
    return categoryData;
  })
  console.log(categoryData);

  const expenseData = {
      'Rent': 0,
      'Mortgage': 0,
      'Loans': 0,
      'Utilities': 0,
      'Restaurants': 0,
      'Groceries': 0,
      'Entertainment': 0,
      'Travel': 0,
      'Vacation': 0,
      'Miscellaneous': 0
    };
    //changed date to to months with its year so we can separate the information between years.
    this.state.expenses.map((expense) => {
      const currDate = this.state.currentYear + this.state.currentMonth;
      const dbDate = expense.expense_date.slice(0,7).split('-');
      const combineDb = dbDate[0] + dbDate[1];

      if (currDate === combineDb && expense.category_id === 1) {
        expenseData.Rent += expense.amount
      }
      if (currDate === combineDb && expense.category_id === 2) {
        expenseData.Mortgage += expense.amount
      }
      if (currDate === combineDb && expense.category_id === 3) {
        expenseData.Loans += expense.amount
      }
      if (currDate === combineDb && expense.category_id === 4) {
        expenseData.Utilities += expense.amount
      }
      if (currDate === combineDb && expense.category_id === 5) {
        expenseData.Restaurants += expense.amount
      }
      if (currDate === combineDb && expense.category_id === 6) {
        expenseData.Groceries += expense.amount
      }
      if (currDate === combineDb && expense.category_id === 7) {
        expenseData.Entertainment += expense.amount
      }
      if (currDate === combineDb && expense.category_id === 8) {
        expenseData.Travel += expense.amount
      }
      if (currDate === combineDb && expense.category_id === 9) {
        expenseData.Vacation += expense.amount
      }
      if (currDate === combineDb && expense.category_id === 10) {
        expenseData.Miscellaneous += expense.amount
      }
      return expenseData;
    })
    console.log(expenseData)

    this.setState({
      pieChartData:{
        labels: categoryData,
        datasets:[
          {
            label:'Category',
            data: [
            expenseData.Rent,
            expenseData.Mortgage,
            expenseData.Loans,
            expenseData.Utilities,
            expenseData.Restaurants,
            expenseData.Groceries,
            expenseData.Entertainment,
            expenseData.Travel,
            expenseData.Vacation,
            expenseData.Miscellaneous
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'green',
              'blue',
              'orange',
              'grey',
            ]
          }
        ]
      }
    });
  };



    getBChartData(){
    const dates = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const monthlyExpense = {
      'Jan': 0,
      'Feb': 0,
      'Mar': 0,
      'Apr': 0,
      'May': 0,
      'Jun': 0,
      'Jul': 0,
      'Aug': 0,
      'Sep': 0,
      'Oct': 0,
      'Nov': 0,
      'Dec': 0
    }

    this.state.expenses.map((expense) => {
      const dbMonth = expense.expense_date.slice(5,7);

      if (dbMonth === '01') {
        monthlyExpense.Jan += expense.amount
      }
       if (dbMonth === '02') {
        monthlyExpense.Feb += expense.amount
      }
       if (dbMonth === '03') {
        monthlyExpense.Mar += expense.amount
      }
       if (dbMonth === '04') {
        monthlyExpense.Apr += expense.amount
      }
       if (dbMonth === '05') {
        monthlyExpense.May += expense.amount
      }
       if (dbMonth === '06') {
        monthlyExpense.Jun += expense.amount
      }
       if (dbMonth === '07') {
        monthlyExpense.Jul+= expense.amount
      }
       if (dbMonth === '08') {
        monthlyExpense.Aug += expense.amount
      }
       if (dbMonth === '09') {
        monthlyExpense.Sep += expense.amount
      }
       if (dbMonth === '10') {
        monthlyExpense.Oct += expense.amount
      }
       if (dbMonth === '11') {
        monthlyExpense.Nov += expense.amount
      }
       if (dbMonth === '12') {
        monthlyExpense.Dec += expense.amount
      }
      return monthlyExpense;
    });
    console.log(monthlyExpense);

    this.setState({
      barChartData: {
        labels: dates,
        datasets: [
          {
            label: 'Total Monthly Expenses',
            data: [
              monthlyExpense.Jan,
              monthlyExpense.Feb,
              monthlyExpense.Mar,
              monthlyExpense.Apr,
              monthlyExpense.May,
              monthlyExpense.Jun,
              monthlyExpense.Jul,
              monthlyExpense.Aug,
              monthlyExpense.Sep,
              monthlyExpense.Oct,
              monthlyExpense.Nov,
              monthlyExpense.Dec
            ],
            backgroundColor:[
              'rgba(24, 108, 205, 0.6)',
              'rgba(24, 108, 205, 0.6)',
              'rgba(24, 108, 205, 0.6)',
              'rgba(24, 108, 205, 0.6)',
              'rgba(24, 108, 205, 0.6)',
              'rgba(24, 108, 205, 0.6)',
              'rgba(24, 108, 205, 0.6)',
              'rgba(24, 108, 205, 0.6)',
              'rgba(24, 108, 205, 0.6)',
              'rgba(24, 108, 205, 0.6)',
              'rgba(24, 108, 205, 0.6)',
              'rgba(24, 108, 205, 0.6)',
            ]
          }
        ]
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="body-container">
          {this.state.dataLoaded === true ? (
            <Switch>

              <Route
                exact
                path='/'
                render={props => <Dashboard {...props}
                  expenses={this.state.expenses}
                  categories={this.state.categories}
                  expenseCreate={this.expenseCreate}
                  expenseDelete={this.expenseDelete}
                  expenseEdit={this.expenseEdit}
                />}
              />

              <Route
                path='/reports'
                render={props => <Reports {...props}
                  pieChartData={this.state.pieChartData}
                  barChartData={this.state.barChartData}
                  expenses={this.state.expenses}
                  categories={this.state.categories}
                  handleSelectCall={this.handleSelectCall}
                />}
              />
            </Switch>
          ) : (
            <p> Loading </p>
          )}
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;

