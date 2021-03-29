import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Row, Col } from 'react-bootstrap';

import graphQLFetch from '../../utils/graphqlFetch'

export default class JobAdd extends React.Component {
    constructor() {
      super();
      this.state = {
        companyValue: -1,
        representatives: [],
        locations: [],
      };
      this.onSubmitHandler = this.onSubmitHandler.bind(this);
      this.onCompanySelectedHandler = this.onCompanySelectedHandler.bind(this);
    }
  
    async loadRep(cid) {
      const query = `query getRep($cid: ID) {
        representative(cid: $cid) {
          _id
          cid
          email
          phone
          name
        }
      }`;
      const data = await graphQLFetch(query, { cid });
      if (data) {
        this.setState({ representatives: data.representative });
      }
    }
  
    async loadLoc(cid) {
      const query = `query getLocations($cid: ID) {
        location(cid: $cid) {
          _id
          cid
          city
          country
          address
          postcode
        }
      }`;
      const data = await graphQLFetch(query, { cid });
      if (data) {
        this.setState({ locations: data.location });
      }
    }
  
    createRepItems() {
      const options = [];
      const reps = this.state.representatives;
      for (let i = 0; i < reps.length; i++) {
        options.push(
          <option key={i} value={reps[i]._id}>
            {reps[i].name}, {reps[i].email}
          </option>
        );
      }
      return options;
    }
  
    createLocItems() {
      const options = [];
      const locs = this.state.locations;
      for (let i = 0; i < locs.length; i++) {
        options.push(
          <option key={i} value={locs[i]._id}>
            {locs[i].city}, {locs[i].country}, {locs[i].address}, {locs[i].postcode}
          </option>
        );
      }
      return options;
    }
  
    createCompItems() {
      const options = [];
      const comps = this.props.comp;
      for (let i = 0; i < comps.length; i++) {
        options.push(
          <option key={i} value={comps[i]._id}>
            {comps[i].name}
          </option>
        );
      }
      options.push(
        <option key={-1} value={-1} disabled>
          Select company
        </option>
      );
      return options;
    }
  
    onCompanySelectedHandler(e) {
      this.loadRep(e.target.value);
      this.loadLoc(e.target.value);
      this.setState({ companyValue: e.target.value });
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
    }
  
    render() {
      return (
        <React.Fragment>
          <div>
            <h3>Select company to add job</h3>
            <select
              name="company"
              id="company"
              defaultValue={-1}
              onChange={this.onCompanySelectedHandler}
            >
              {this.createCompItems()}
            </select>
          </div>
          {this.state.companyValue !== -1 && (
            
            <Form name="jobAdd" onSubmit={this.onSubmitHandler}>
              <Row>
              <Col xs={6} sm={4} md={3} lg={2}>
                <FormGroup>
                  <ControlLabel>Title</ControlLabel>
                  <FormControl type="text" name="title" placeholder="Title"/>
                </FormGroup>
              </Col>
              <Col xs={6} sm={4} md={3} lg={2}>
                <FormGroup>
                  <ControlLabel>Personel</ControlLabel>
                  <FormControl type="number" step={1} name="personel" placeholder="Personel"/>
                </FormGroup>
              </Col>
                <FormGroup>
                  <ControlLabel>Rate /h</ControlLabel>
                  <FormControl type="number" step={.01} name="rate" placeholder="Rate/ h"/>
                </FormGroup>
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
                <FormGroup>
                  <ControlLabel>Description</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Description" name="description"/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Representative:</ControlLabel>
                    <FormControl
                      componentClass="select"
                      name="representative"
                    >
                      {this.createRepItems()}
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Location:</ControlLabel>
                    <FormControl
                      componentClass="select"
                      name="location"
                    >
                      {this.createLocItems()}
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Start</ControlLabel>
                  <FormControl type="date" name="start" placeholder="Start"/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>End</ControlLabel>
                  <FormControl type="date" name="end" placeholder="End"/>
                </FormGroup>
                <Button bsStyle="success" type="submit">Add</Button>
              </Row>
            </Form>
          )}
        </React.Fragment>
      );
    }
  }