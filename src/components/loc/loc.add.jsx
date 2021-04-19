import React from 'react';
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import locValidator from '../../utils/validators/loc.validator.js'

export default class LocAdd extends React.Component {
    constructor() {
      super();
      this.state = {
        errors: {}
      }
      this.onLocSubmitHandler = this.onLocSubmitHandler.bind(this);
    }

    onLocSubmitHandler(e) {
      e.preventDefault();
      const form = document.forms.locAdd;
      const location = {
          address: form.address.value,
          postcode: form.postcode.value,
          city: form.city.value,
          country: form.country.value,
          cid: this.props.cid,
      };
      const errors = locValidator(location)
      if (JSON.stringify(errors) === "{}") {
        this.props.createLocation(location);
        form.address.value = '';
        form.postcode.value = '';
        form.city.value = '';
        form.country.value = '';
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
        <Form horizontal name="locAdd" onSubmit={this.onLocSubmitHandler}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Address</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Provide address"
                />
                {errors.address && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("address")}>{errors.address}</Alert>}
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Postcode</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="postcode"
                  id="postcode"
                  placeholder="Provide postcode"
                />
                {errors.postcode && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("postcode")}>{errors.postcode}</Alert>}
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>City</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Provide city"
                />
                {errors.city && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("city")}>{errors.city}</Alert>}
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Country</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Provide country"
                />
                {errors.country && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("country")}>{errors.country}</Alert>}
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col sm={3} />
              <Col sm={6}>
                  <Button type="submit" bsStyle="success">Add location</Button>
              </Col>
            <Col sm={3} />
          </FormGroup>
        </Form>
      );
    }
  }
