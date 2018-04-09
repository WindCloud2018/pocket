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
  }


  getCurrentMonth() {
    const current = new Date().getMonth();
    console.log(current, 'this is current date need to add 1 and a 0 before because jan is index 0 and original dates have 0 in front of them')
    const newCurrent = ('0' + (current + 1));
    console.log(newCurrent, 'this is converted DATE with PLUS ONE')
      this.setState({
        currentMonth: newCurrent
      });
    console.log(this.state.currentMonth, 'this is coming from state how come you do not see me?')
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

  handleSelectCall(e){
    this.setState({

    })
  }

  getPChartData(){
  const categoryData = [];
  this.state.categories.map((category) => {
    categoryData.push(category.category);
    return categoryData;
  })
  console.log(categoryData);

  const expenseData = [{
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
    }];

    this.state.expenses.map((expense) => {
      const currM = this.state.currentMonth;
      if ( expense.category_id === 1) {
        expenseData[0].Rent += expense.amount
      }
      if (expense.category_id === 2) {
        expenseData[0].Mortgage += expense.amount
      }
      if (expense.category_id === 3) {
        expenseData[0].Loans += expense.amount
      }
      if (expense.category_id === 4) {
        expenseData[0].Utilities += expense.amount
      }
      if (expense.category_id === 5) {
        expenseData[0].Restaurants += expense.amount
      }
      if (expense.category_id === 6) {
        expenseData[0].Groceries += expense.amount
      }
      if (expense.category_id === 7) {
        expenseData[0].Entertainment += expense.amount
      }
      if (expense.category_id === 8) {
        expenseData[0].Travel += expense.amount
      }
      if (expense.category_id === 9) {
        expenseData[0].Vacation += expense.amount
      }
      if (expense.category_id === 10) {
        expenseData[0].Miscellaneous += expense.amount
      }
      return expenseData[0];
    })
    console.log(expenseData[0])

    this.setState({
      pieChartData:{
        labels: categoryData,
        datasets:[
          {
            label:'Category',
            data: [
            expenseData[0].Rent,
            expenseData[0].Mortgage,
            expenseData[0].Loans,
            expenseData[0].Utilities,
            expenseData[0].Restaurants,
            expenseData[0].Groceries,
            expenseData[0].Entertainment,
            expenseData[0].Travel,
            expenseData[0].Vacation,
            expenseData[0].Miscellaneous
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

    //tried to dynamically render dates from data base but realized if user doesnt track expenses that month then app will just leave it blank no need to do it dynamically. whats important is to be able to group all the expenses to their related months and years.

    getBChartData(){
    const dates = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const monthlyExpense = [{
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
    }]

    this.state.expenses.map((expense) => {
      const dbMonth = expense.expense_date.slice(5,7); console.log(dbMonth, 'this is sliced expense dates to display months')
        // console.log(months[0].Apr += expense.amount)
      if (dbMonth === '01') {
        monthlyExpense[0].Jan += expense.amount
      }
       if (dbMonth === '02') {
        monthlyExpense[0].Feb += expense.amount
      }
       if (dbMonth === '03') {
        monthlyExpense[0].Mar += expense.amount
      }
       if (dbMonth === '04') {
        monthlyExpense[0].Apr += expense.amount
      }
       if (dbMonth === '05') {
        monthlyExpense[0].May += expense.amount
      }
       if (dbMonth === '06') {
        monthlyExpense[0].Jun += expense.amount
      }
       if (dbMonth === '07') {
        monthlyExpense[0].Jul+= expense.amount
      }
       if (dbMonth === '08') {
        monthlyExpense[0].Aug += expense.amount
      }
       if (dbMonth === '09') {
        monthlyExpense[0].Sep += expense.amount
      }
       if (dbMonth === '10') {
        monthlyExpense[0].Oct += expense.amount
      }
       if (dbMonth === '11') {
        monthlyExpense[0].Nov += expense.amount
      }
       if (dbMonth === '12') {
        monthlyExpense[0].Dec += expense.amount
      }
      return monthlyExpense[0];
    });
    console.log(monthlyExpense[0]);

    this.setState({
      barChartData: {
        labels: dates,
        datasets: [
          {
            label: 'Total Monthly Expenses',
            data: [
              monthlyExpense[0].Jan,
              monthlyExpense[0].Feb,
              monthlyExpense[0].Mar,
              monthlyExpense[0].Apr,
              monthlyExpense[0].May,
              monthlyExpense[0].Jun,
              monthlyExpense[0].Jul,
              monthlyExpense[0].Aug,
              monthlyExpense[0].Sep,
              monthlyExpense[0].Oct,
              monthlyExpense[0].Nov,
              monthlyExpense[0].Dec
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

