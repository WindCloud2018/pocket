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
      data: null,
      dataLoaded: false
    };
    this.getBalances = this.getBalances.bind(this);
    this.balanceCreate = this.balanceCreate.bind(this);
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getBalances();
  }

  getBalances() {
    fetch('/api/balances')
      .then(res => res.json())
      .then((res) => {
        this.setState({
          data: res.data.balances,
          dataLoaded: true
        });
      })
      .catch(err => console.log(err));
  }

  balanceCreate(event, data) {
    console.log(data)
    event.preventDefault();
    fetch('/api/balances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(res => {
        this.getBalances();
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
