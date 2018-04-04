import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import './App.css';

class App extends Component {
  // Initialize state
  constructor() {
    super();
    this.state = {
      expenses: null,
      categories: null,
      dataLoaded: false
    };
    this.getExpenses = this.getExpenses.bind(this);
    this.expenseCreate = this.expenseCreate.bind(this);
    this.expenseDelete = this.expenseDelete.bind(this);
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
    console.log(data)
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
