import React, { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {

    };
  }

  render() {
    return(
      <div className="dashboard expense-container">
        <div>
          <p className="expense-block-title">Expenses</p>
          <div className="expense-block-subtitle">
            <p>Description</p>
            <p>Amount</p>
            <p>Date</p>
            <p>Category</p>
          </div>
        </div>
        {this.props.expenses.map((expense, i) => (
          <div key={expense.id} className="expense-block">
            <p className="expense-description">{expense.description}</p>
            <p>${expense.amount}</p>
            <p>{expense.data_created.slice(0, 10)}</p>
            <p>Categories</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Dashboard;
