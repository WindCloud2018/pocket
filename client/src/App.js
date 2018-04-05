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
    this.getPChartData = this.getPChartData.bind(this);
    this.getBChartData = this.getBChartData.bind(this);
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getCategories();
    this.getExpenses();
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

  getExpenses() {
    fetch('/api/expenses')
      .then(res => res.json())
      .then((res) => {
        this.setState({
          expenses: res.data.expenses,
          dataLoaded: true
        });
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


  getPChartData(){
  // const categoryData = ['','','','']
  const categoryData = [];
  this.state.categories.forEach((category) => {
    categoryData.push(category.category);
    console.log(categoryData);
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
  this.state.expenses.map((expense) => {
    if (expense.category_id === 1) {
      expense = (expenseData.Rent + expense.amount);
    }
    if (expense.category_id === 2) {
      expense = (expenseData.Mortgage += expense.amount);
    }
    if (expense.category_id === 3) {
      expense = (expenseData.Loans += expense.amount);
    }
    if (expense.category_id === 4) {
      expense = (expenseData.Utilities += expense.amount);
    }
    if (expense.category_id === 5) {
      expense = (expenseData.Restaurants += expense.amount);
    }
    if (expense.category_id === 6) {
      expense = (expenseData.Groceries += expense.amount);
    }
    if (expense.category_id === 7) {
      expense = (expenseData.Entertainment += expense.amount);
    }
    if (expense.category_id === 8) {
      expense = (expenseData.Travel += expense.amount);
    }
    if (expense.category_id === 9) {
      expense = (expenseData.Vacation += expense.amount);
    }
    if (expense.category_id === 10) {
      expense = (expenseData.Miscellaneous += expense.amount);
    }
  })
    this.setState({
      pieChartData:{
        // labels: ['a','b','c','d','e','f','g','h'],
        labels: categoryData,
        datasets:[
          {
            label:'Category',
            data: expenseData[0],
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
    this.setState({
      barChartData: {
        labels: ['April'],
        datasets: [
          {
            label: 'Expenses',
            data:[
              3000
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
                  getPChartData={this.getPChartData}
                  getBChartData={this.getBChartData}
                  barChartData={this.state.barChartData}
                  expenses={this.state.expenses}
                  categories={this.state.categories}
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
