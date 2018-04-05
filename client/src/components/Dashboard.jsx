import React, { Component } from 'react';
import FormModal from './FormModal';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_expense_id: '',
      cur_description: '',
      cur_amount: '',
      cur_category_id: 1,
      cur_expense_date: '',
      modal: false,
      editing: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      editing: false
    });
  }

  handleDelete(id) {
    this.props.expenseDelete(id)
  }

  handleEdit(id, description, amount, category_id, expense_date) {
    this.setState({
      cur_expense_id: id,
      cur_description: description,
      cur_amount: amount,
      cur_category_id: category_id,
      cur_expense_date: expense_date,
      modal: !this.state.modal,
      editing: !this.state.editing
    })
  }

  render() {
    return(
      <div>
        <FormModal {...this.props}
          toggle={this.toggle}
          cur_expense_id={this.state.cur_expense_id}
          cur_description={this.state.cur_description}
          cur_amount={this.state.cur_amount}
          cur_category_id={this.state.cur_category_id}
          cur_expense_date={this.state.cur_expense_date}
          modal={this.state.modal}
          editing={this.state.editing}
        />

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
                  onClick={() => {
                    this.handleEdit(expense.expense_id, expense.description, expense.amount, expense.category_id, expense.expense_date)
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
