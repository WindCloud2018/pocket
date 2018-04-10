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
    this.handleSelectYearCall = this.handleSelectYearCall.bind(this);
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getCategories();
    this.getExpenses();
    this.getCurrentMonth();
    this.getCurrentYear();
  }


//getMonth() starts in index 0, plus one sets months to norm.
  getCurrentMonth() {
    const current = new Date().getMonth();
    let newCurrent = current + 1
    if (newCurrent < 10) {
      newCurrent = '0' + newCurrent;
    }
    this.setState({
      currentMonth: newCurrent
    });
  }

  //get current year
  getCurrentYear(){
    const currYear = new Date().getFullYear().toString();
    this.setState({
      currentYear: currYear
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

//after getting expenses data get P chart and B chart Data
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
      this.getBChartData();
    })
  }

  handleSelectYearCall(value) {
    this.setState({
      currentYear: value
    }, () => {
      this.getPChartData();
      this.getBChartData();
    })
  }

//this pie chart data will be passed into Reports Component
  getPChartData(){
  const categoryData = [];
  this.state.categories.map((category) => {
    categoryData.push(category.category);
    return categoryData;
  })

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
      const combineDb = dbDate[0] + dbDate[1] + '';

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
      const dbYear = expense.expense_date.slice(0,4);
      const currYear = this.state.currentYear;

      if (dbYear === currYear && dbMonth === '01') {
        monthlyExpense.Jan += expense.amount
      }
       if (dbYear === currYear && dbMonth === '02') {
        monthlyExpense.Feb += expense.amount
      }
       if (dbYear === currYear && dbMonth === '03') {
        monthlyExpense.Mar += expense.amount
      }
       if (dbYear === currYear && dbMonth === '04') {
        monthlyExpense.Apr += expense.amount
      }
       if (dbYear === currYear && dbMonth === '05') {
        monthlyExpense.May += expense.amount
      }
       if (dbYear === currYear && dbMonth === '06') {
        monthlyExpense.Jun += expense.amount
      }
       if (dbYear === currYear && dbMonth === '07') {
        monthlyExpense.Jul+= expense.amount
      }
       if (dbYear === currYear && dbMonth === '08') {
        monthlyExpense.Aug += expense.amount
      }
       if (dbYear === currYear && dbMonth === '09') {
        monthlyExpense.Sep += expense.amount
      }
       if (dbYear === currYear && dbMonth === '10') {
        monthlyExpense.Oct += expense.amount
      }
       if (dbYear === currYear && dbMonth === '11') {
        monthlyExpense.Nov += expense.amount
      }
       if (dbYear === currYear && dbMonth === '12') {
        monthlyExpense.Dec += expense.amount
      }
      return monthlyExpense;
    });

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
                  handleSelectYearCall={this.handleSelectYearCall}
                  currentYear={this.state.currentYear}
                  currentMonth={this.state.currentMonth}
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

