import React, { Component } from 'react';
import FormModal from './FormModal';
import { Button } from 'reactstrap';
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
      editing: false,
      winWid: window.innerWidth
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
      <div className="dashboard">

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

        <div className="expense-container">
          <h2 className="expense-block-title">Expense</h2>
        {this.props.expenses.map((expense, i) => (
          <div key={expense.expense_id} className="expense-block">
            <img className="expense-table-align-icon" src={window.location.origin + '/img/' + expense.category + '.png' } alt={expense.category} />
            <div className="expense-description expense-table-align">
              <h5>{expense.description}</h5>
              <p>{expense.expense_date.slice(0, 10).split("-")[1]}/{expense.expense_date.slice(0, 10).split("-")[2]}/{expense.expense_date.slice(0, 10).split("-")[0]}</p>
            </div>
            <p className="expense-table-align">${expense.amount}</p>

            <div className="button-block">
              <Button
                className="button"
                color="link"
                onClick={() => {
                  this.handleEdit(expense.expense_id, expense.description, expense.amount, expense.category_id, expense.expense_date)
                }}
              ><i className="fas fa-edit"></i></Button>
              <Button
                className="button"
                color="link"
                onClick={() => {
                  this.handleDelete(expense.expense_id)
                }}
              ><i className="fas fa-trash-alt"></i></Button>
            </div>
          </div>
        ))}
        </div>
      </div>
    )
  }
}

export default Dashboard;
