import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import EntryForm from './EntryForm';
import './FormModal.css';

const FormModal = (props) => {
  return (
    <div>

  {/* floating add button */}
      <a href="#" className="float" onClick={() => {
              props.toggle()
            }}>
       <i className="fa fa-plus my-float"></i>
      </a>

 {/* Show or hide modal on button */}
      <Modal
        isOpen={props.modal}
        toggle={() => {
          props.toggle()
        }}
        className={props.className}
      >
        <ModalHeader
          toggle={() => {
            props.toggle()
          }}
        >
          {props.editing ?
            "Edit Expense" : "Add Expense"
          }
        </ModalHeader>
        <ModalBody>
          <EntryForm {...props} />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default FormModal;
