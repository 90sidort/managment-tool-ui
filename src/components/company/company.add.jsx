import React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

export default class CompanyAdd extends React.Component {
    constructor() {
      super();
      this.onSkillSubmitHandler = this.onSkillSubmitHandler.bind(this);
    }
    onSkillSubmitHandler(e) {
      e.preventDefault();
      const form = document.forms.companyAdd;
      const company = {
        company: {
          name: form.name.value,
          description: form.description.value,
          industry: form.industry.value,
        }
      };
      this.props.createCompany(company);
      form.name.value = '';
      form.description.value = '';
      form.industry.value = -1;
    }
    render() {
      return (
        <Form horizontal name="companyAdd" onSubmit={this.onSkillSubmitHandler}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Name</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Provide company name"
                  onChange={this.onCompanySelectedHandler}
                />
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Name</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Provide company name"
                  onChange={this.onCompanySelectedHandler}
                />
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Name</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Provide company name"
                  onChange={this.onCompanySelectedHandler}
                />
              </Col>
            <Col sm={3} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Name</Col>
              <Col sm={6}>
                  <Button type="submit" bsStyle="success">Add company</Button>
              </Col>
            <Col sm={3} />
          </FormGroup>
        </Form>
      );
    }
  }
