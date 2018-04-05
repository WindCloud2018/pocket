import React, { Component } from 'react';
import CreateNewExpense from './CreateNewExpense';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(id) {
    this.props.expenseDelete(id)
  }

  handleEdit(id) {
    this.setState({
      id: id
    })
  }

  render() {
    return(
      <div>

        <CreateNewExpense {...this.props}/>

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
            <div key={expense.expense_id} className="expense-block">
              <p className="expense-description">{expense.description}</p>
              <p>${expense.amount}</p>
              <p>{expense.expense_date.slice(0, 10)}</p>
              <p>{expense.category}</p>
              <div>
                <button
                  className="edit-btn"
                  value={expense.expense_id}
                  onClick={() => {
                    this.handleEdit(expense.expense_id)
                  }}
                ><i className="fas fa-edit"></i></button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    this.handleDelete(expense.expense_id)
                  }}
                ><i className="fas fa-trash-alt"></i></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Dashboard;
