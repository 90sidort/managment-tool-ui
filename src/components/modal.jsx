import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function(props) {
  const {confirm, showHide, text} = props
  console.log('moje propsy', props);
  return (
    <React.Fragment>
      <Modal.Header>
        <Modal.Title>Delete job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {text}
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={confirm}>Confirm</Button>
        <Button bsStyle="link" onClick={showHide}>Cancel</Button>
      </Modal.Footer>
    </React.Fragment>
  )
}