import React from 'react';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Row,
  Col,
  Alert
} from 'react-bootstrap';

import addValidation from '../../utils/addValidation';
import withToast from '../toast.wrapper.jsx';
import graphQLFetch from '../../utils/graphqlFetch';
import AuthContext from "../../context/auth.context.js";
import { loadLoc, loadReps } from '../../utils/queries/job.queries';
import { createOptions } from "../../utils/createOptions"

class JobAdd extends React.Component {
    static contextType = AuthContext;
    constructor() {
      super();
      this.state = {
        companyValue: -1,
        representatives: [],
        locations: [],
        errors: {},
      };
      this.onSubmitHandler = this.onSubmitHandler.bind(this);
      this.onCompanySelectedHandler = this.onCompanySelectedHandler.bind(this);
      this.closeAddPanel = this.closeAddPanel.bind(this)
    }

    async loadRep(cid) {
      const { token } = this.context
      const { showError } = this.props
      const query = loadReps;
      const data = await graphQLFetch(query, { cid }, showError, token);
      if (data) {
        this.setState({ representatives: data.representative });
      } else {
        showError('Unable to load data')
      }
    }
  
    async loadLoc(cid) {
      const { token } = this.context
      const { showError } = this.props
      const query = loadLoc;
      const data = await graphQLFetch(query, { cid }, showError, token);
      if (data) {
        this.setState({ locations: data.location });
      } else {
        showError('Unable to load data')
      }
    }
  
    onCompanySelectedHandler(e) {
      this.loadRep(e.target.value);
      this.loadLoc(e.target.value);
      this.setState({ companyValue: e.target.value });
    }
  
    closeAddPanel() {
      this.setState({companyValue : -1})
    }

    dismissValidation(name) {
      const newErrors = {...this.state.errors}
      delete newErrors[name]
      this.setState({ errors: newErrors });
    }

    onSubmitHandler(e) {
      e.preventDefault();
      const form = document.forms.jobAdd;
      const job = {
        title: form.title.value,
        personel: parseInt(form.personel.value),
        rate: parseFloat(form.rate.value),
        description: form.description.value,
        currency: form.currency.value,
        representative: form.representative.value,
        location: form.location.value,
        company: this.state.companyValue,
        start: new Date(form.start.value),
        end: new Date(form.end.value),
        created: new Date(),
        status: 'New',
      };
      const errors = addValidation(job)
      if (JSON.stringify(errors) === "{}") {
        this.props.createJob(job);
        form.title.value = ""
        form.personel.value = ""
        form.rate.value = ""
        form.description.value = ""
        form.representative.value = ""
        form.location.value = ""
        form.start.value = ""
        form.end.value = ""
        this.setState({companyValue : -1})
      } else {
        this.setState({errors})
      }
    }
  
    render() {
      const companies = this.props.comp
      const { representatives, errors, locations } = this.state
      return (
        <React.Fragment>
          <div>
            <h3>Select company to add job</h3>
            <Row>
              <Col xs={8} sm={8} md={8} lg={8}>
              <FormControl
              componentClass="select"
              name="company"
              value={this.state.companyValue}
              id="company"
              onChange={this.onCompanySelectedHandler}
            >
              {createOptions("companies", companies)}
              </FormControl>
              {errors.company && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("company")}>{errors.company}</Alert>}
              </Col>
            </Row>
          </div>
          {this.state.companyValue !== -1 && (
            
            <Form name="jobAdd" onSubmit={this.onSubmitHandler}>
              <Row>
              <Col xs={6} sm={4} md={3} lg={2}>
                <FormGroup>
                  <ControlLabel>Title</ControlLabel>
                  <FormControl type="text" name="title" placeholder="Title"/>
                </FormGroup>
                {errors.title && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("title")}>{errors.title}</Alert>}
              </Col>
              <Col xs={6} sm={4} md={3} lg={2}>
                <FormGroup>
                  <ControlLabel>Personel</ControlLabel>
                  <FormControl type="number" step={1} name="personel" placeholder="Personel"/>
                </FormGroup>
                {errors.personel && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("personel")}>{errors.personel}</Alert>}
              </Col>
              <Col xs={6} sm={4} md={3} lg={2}>
                <FormGroup>
                  <ControlLabel>Rate /h</ControlLabel>
                  <FormControl type="number" step={.01} name="rate" placeholder="Rate/ h"/>
                </FormGroup>
                {errors.rate && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("rate")}>{errors.rate}</Alert>}
              </Col>
              <Col xs={6} sm={4} md={3} lg={2}>
                <FormGroup>
                <ControlLabel>Currency:</ControlLabel>
                  <FormControl
                      componentClass="select"
                      name="currency"
                    >
                      <option value="PLN">PLN</option>
                      <option value="GBP">GBP</option>
                      <option value="EUR">EUR</option>
                  </FormControl>
                </FormGroup>
                {errors.currency && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("currency")}>{errors.currency}</Alert>}
              </Col>
            </Row>
            <Row>
              <Col xs={6} sm={4} md={3} lg={2}>
                <FormGroup>
                  <ControlLabel>Representative:</ControlLabel>
                    <FormControl
                      componentClass="select"
                      name="representative"
                    >
                      {createOptions("rep", representatives)}
                  </FormControl>
                </FormGroup>
                {errors.representative && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("representative")}>{errors.representative}</Alert>}
              </Col>
              <Col xs={6} sm={4} md={3} lg={2}>
                <FormGroup>
                  <ControlLabel>Location:</ControlLabel>
                    <FormControl
                      componentClass="select"
                      name="location"
                    >
                      {createOptions("loc", locations)}
                  </FormControl>
                </FormGroup>
                {errors.location && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("location")}>{errors.location}</Alert>}
              </Col>
              <Col xs={6} sm={4} md={3} lg={2}>
                <FormGroup>
                  <ControlLabel>Start</ControlLabel>
                  <FormControl type="date" name="start" placeholder="Start" onKeyDown={(e) => e.preventDefault()} />
                </FormGroup>
                {errors.start && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("start")}>{errors.start}</Alert>}
              </Col>
              <Col xs={6} sm={4} md={3} lg={2}>
                <FormGroup>
                  <ControlLabel>End</ControlLabel>
                  <FormControl type="date" name="end" placeholder="End" onKeyDown={(e) => e.preventDefault()} />
                </FormGroup>
                {errors.end && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("end")}>{errors.end}</Alert>}
              </Col>
            </Row>
            <Row>
              <Col xs={8} sm={8} md={8} lg={8}>
                <FormGroup>
                  <ControlLabel>Description</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Description" name="description"/>
                </FormGroup>
                {errors.description && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("description")}>{errors.description}</Alert>}
              </Col> 
              </Row>
              <Row>
              <Col xs={8} sm={8} md={8} lg={8}>
                <Button bsStyle="success" type="submit">Add</Button>
                {' '}
                <Button bsStyle="warning" onClick={this.closeAddPanel}>Close</Button>
                </Col>
              </Row>
            </Form>
          )}
        </React.Fragment>
      );
    }
  }

const JobAddWithToast = withToast(JobAdd);
export default JobAddWithToast;