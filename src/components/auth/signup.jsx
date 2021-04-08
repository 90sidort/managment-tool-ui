import React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

export default function(props) {
  return (
    <Form horizontal name="signup" onSubmit={props.onSubmitHandle}>
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>Name</Col>
      <Col sm={8}>
        <FormControl
          type="text"
          name="name"
          placeholder="Name"
          value={props.name}
          onChange={props.onValueChange}
        />
        {/* {errors.company && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("company")}>{errors.company}</Alert>} */}
      </Col>
      <Col sm={2} />
    </FormGroup>
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>Surname</Col>
      <Col sm={8}>
        <FormControl
          type="text"
          name="surname"
          placeholder="Surname"
          value={props.surname}
          onChange={props.onValueChange}
        />
        {/* {errors.company && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("company")}>{errors.company}</Alert>} */}
      </Col>
      <Col sm={2} />
    </FormGroup>
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>Phone</Col>
      <Col sm={8}>
        <FormControl
          type="text"
          name="phone"
          placeholder="Phone"
          value={props.phone}
          onChange={props.onValueChange}
        />
        {/* {errors.company && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("company")}>{errors.company}</Alert>} */}
      </Col>
      <Col sm={2} />
    </FormGroup>
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>Position</Col>
      <Col sm={8}>
        <FormControl
          type="text"
          name="position"
          placeholder="Position"
          value={props.position}
          onChange={props.onValueChange}
        />
        {/* {errors.company && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("company")}>{errors.company}</Alert>} */}
      </Col>
      <Col sm={2} />
    </FormGroup>
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>Email</Col>
      <Col sm={8}>
        <FormControl
          type="email"
          name="email"
          placeholder="Email"
          value={props.email}
          onChange={props.onValueChange}
        />
        {/* {errors.company && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("company")}>{errors.company}</Alert>} */}
      </Col>
      <Col sm={2} />
    </FormGroup>
    <FormGroup>
      <Col componentClass={ControlLabel} sm={2}>Password</Col>
      <Col sm={8}>
        <FormControl
          type="password"
          name="password"
          placeholder="Password"
          value={props.password}
          onChange={props.onValueChange}
        />
        {/* {errors.company && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("company")}>{errors.company}</Alert>} */}
      </Col>
      <Col sm={2} />
    </FormGroup>
    <FormGroup>
      <Col sm={2} />
      <Col sm={8}>
        <Button bsStyle="success" type="submit">Singup</Button>
        {' '}
        <Button onClick={props.onSignChange}>Go to signin</Button>
      </Col>
      <Col sm={2} />
    </FormGroup>
  </Form>
  )
}
