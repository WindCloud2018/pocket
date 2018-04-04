import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import './EntryForm.css';

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      amount: '',
      category_id: 1,
      expense_date: '',
      missing_info: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.description !== '' &&
      this.state.amount !== '' &&
      this.state.expense_date !== ''
      ) {
      this.props.toggle()
      this.props.expenseCreate(e, this.state)
    } else {
      this.setState({
        missing_info: true
      })
    }
  }

  render() {
    return (
      <Form>

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
            value={this.state.category}
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
            placeholder="Date"
            onChange={this.handleChange}
          />
        </FormGroup>

        <ModalFooter>
          <Button color="secondary" onClick={this.handleSubmit}>Submit</Button>
          <Button color="link" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>

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
