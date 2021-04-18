import React from 'react';
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import repValidator from '../../utils/validators/rep.validator.js';

export default class CompanyAdd extends React.Component {
    constructor() {
      super();
      this.state = {
        errors: {}
      }
      this.onRepSubmitHandler = this.onRepSubmitHandler.bind(this);
    }

    onRepSubmitHandler(e) {
        const { cid } = this.props
      e.preventDefault();
      const form = document.forms.addRep;
      const rep = {
          representative : {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                cid
            },
      };
      const errors = repValidator(rep.representative)
      if (JSON.stringify(errors) === "{}") {
        this.props.createRep(rep);
        form.name.value = '';
        form.email.value = '';
        form.phone.value = '';
      } else this.setState({errors})
    }

    dismissValidation(name) {
      const newErrors = {...this.state.errors}
      delete newErrors[name]
      this.setState({ errors: newErrors });
    }

    render() {
      const { errors } = this.state;
      return (
        <Form horizontal name="addRep" onSubmit={this.onRepSubmitHandler}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Name</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Provide representative name"
                />
                {errors.name && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("name")}>{errors.name}</Alert>}
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Email</Col>
              <Col sm={6}>
                <FormControl
                    componentClass="input"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Provide representative email"
                    />
                    {errors.email && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("email")}>{errors.email}</Alert>}
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Phone</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Provide representative phone"
                />
                {errors.phone && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("phone")}>{errors.phone}</Alert>}
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col sm={3} />
              <Col sm={6}>
                  <Button type="submit" bsStyle="success">Add representative</Button>
              </Col>
            <Col sm={3} />
          </FormGroup>
        </Form>
      );
    }
  }
