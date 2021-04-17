import React from 'react';
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import companyValidator from '../../utils/validators/company.validator.js'

export default class CompanyAdd extends React.Component {
    constructor() {
      super();
      this.state = {
        errors: {}
      }
      this.onCompanySubmitHandler = this.onCompanySubmitHandler.bind(this);
    }

    onCompanySubmitHandler(e) {
      e.preventDefault();
      const form = document.forms.companyAdd;
      const company = {
          name: form.name.value,
          description: form.description.value,
          industry: form.industry.value === "-1" ? "" : form.industry.value,
      };
      const errors = companyValidator(company)
      if (JSON.stringify(errors) === "{}") {
        this.props.createCompany(company);
        form.name.value = '';
        form.description.value = '';
        form.industry.value = -1;
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
        <Form horizontal name="companyAdd" onSubmit={this.onCompanySubmitHandler}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Name</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Provide company name"
                />
                {errors.name && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("name")}>{errors.name}</Alert>}
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Industry</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="select"
                  name="industry"
                  id="industry"
                  defaultValue={-1}
                >
                  <option key={-1} value={-1} disabled>Select company</option>
                  <option value="Services">Services</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Manufacturing">Manufacturing</option>
                </FormControl>
                {errors.industry && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("industry")}>{errors.industry}</Alert>}
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Description</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Provide company description"
                />
                {errors.description && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("description")}>{errors.description}</Alert>}
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col sm={3} />
              <Col sm={6}>
                  <Button type="submit" bsStyle="success">Add company</Button>
              </Col>
            <Col sm={3} />
          </FormGroup>
        </Form>
      );
    }
  }
