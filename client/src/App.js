import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  constructor() {
    super();
    this.state = {
      data: null,
      amount: undefined,
      description: undefined,
      asset: undefined,
      category_id: undefined,
      dataLoaded: false
    };
    this.getBalances = this.getBalances.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    {this.balanceCreate(e, this.state)}
  }

  render() {
    return (
      <div className="App">
        {this.state.dataLoaded === true ? (
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" name="amount" value={this.state.amount} placeholder="Amount" onChange={this.handleChange} />
                <br/>
              <input type="text" name="description" value={this.state.description} placeholder="Description" onChange={this.handleChange} />
            </label>
            <br/>
            <input className="submitButton" type="submit" value="Submit" />
          </form>
        ) : (
          <p> Loading </p>
        )}
      </div>
    );
  }
}

export default App;
