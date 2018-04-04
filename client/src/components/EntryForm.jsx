import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, ModalFooter } from 'reactstrap';
import './EntryForm.css';

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      amount: '',
      category_id: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.toggle()
    this.props.expenseCreate(e, this.state)
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
                key={category.id}
                value={category.id}
              >{category.category}</option>
            ))}
          </Input>
        </FormGroup>

        <ModalFooter>
          <Button color="secondary" onClick={this.handleSubmit}>Submit</Button>{' '}
          <Button color="link" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
      </Form>
    )
  }
}

export default EntryForm;
