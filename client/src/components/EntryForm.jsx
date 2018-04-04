import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './EntryForm.css';

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Form>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="text" name="text" id="description" placeholder="Description" />
        </FormGroup>

        <FormGroup>
          <Label for="description">Amount</Label>
          <Input type="number" name="number" id="amount" placeholder="Description" />
        </FormGroup>

          <FormGroup>
          <Label for="categories">Categories</Label>
          <Input type="select" name="select" id="categories">

            {this.props.categories.map((category, i) => (
              <option key={category.id}>{category.category}</option>
            ))}
          </Input>
        </FormGroup>
      </Form>
    )
  }
}

export default EntryForm;
