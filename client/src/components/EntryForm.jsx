import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import './EntryForm.css';

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense_id: '',
      description: '',
      amount: '',
      category_id: 1,
      expense_date: '',
      missing_info: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.checkFills = this.checkFills.bind(this);
  }

  componentDidMount() {
    if (this.props.editing) {
      this.setState({
        expense_id: this.props.cur_expense_id,
        description: this.props.cur_description,
        amount: this.props.cur_amount,
        category_id: this.props.cur_category_id,
        expense_date: this.props.cur_expense_date.slice(0, 10)
      })
    }
  }

  toggle() {
    this.setState({
      missing_info: !this.state.missing_info
    });
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val,
    });
  }

  checkFills() {
    if (
      this.state.description !== '' &&
      this.state.amount !== '' &&
      this.state.expense_date !== ''
      ) {
      return true
    } else {
      return false
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.checkFills()) {
      this.props.toggle()
      if (this.props.editing) {
        this.props.expenseEdit(e, this.state, this.state.expense_id)
      } else {
        this.props.expenseCreate(e, this.state)
      }
    } else {
      this.setState({
        missing_info: true
      })
    }
  }

  render() {
    return (
      <Form>

{/* Fields for data entry */}
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="text"
            name="description"
            id="description"
            value={this.state.description}
            placeholder="Description"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="amount">Amount</Label>
          <Input
            type="number"
            name="amount"
            value={this.state.amount}
            id="amount"
            placeholder="Amount"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="categories">Categories</Label>
          <Input
            type="select"
            name="category_id"
            id="category_id"
            value={this.state.category_id}
            onChange={this.handleChange}
          >
            {this.props.categories.map((category, i) => (
              <option
                key={category.category_id}
                value={category.category_id}
              >{category.category}</option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="expense_date">Expense Date</Label>
          <Input
            type="date"
            name="expense_date"
            id="expense_date"
            value={this.state.expense_date}
            onChange={this.handleChange}
          />
        </FormGroup>

{/* Display Submit/Edit and cancel button for form */}
        <ModalFooter>

          <Button color="secondary" onClick={this.handleSubmit}>

            {this.props.editing ? "Edit" : "Submit"}

          </Button>
          <Button color="link" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>

{/* Show modal style warning if all fields not filled */}
        <Modal isOpen={this.state.missing_info} toggle={this.toggle} className={this.props.className}>
          <ModalBody>
            Please Fill Out Every Section.
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>Ok</Button>
          </ModalFooter>
        </Modal>
      </Form>
    )
  }
}

export default EntryForm;
