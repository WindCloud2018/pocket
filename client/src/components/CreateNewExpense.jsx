import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import EntryForm from './EntryForm';
import './CreateNewExpense.css';

class CreateNewExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>Launch Modal</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add Expense</ModalHeader>
          <ModalBody>
            <EntryForm
              {...this.props}
              toggle={this.toggle}
            />
          </ModalBody>
        </Modal>
      </div>
    )
  }

};

export default CreateNewExpense;
