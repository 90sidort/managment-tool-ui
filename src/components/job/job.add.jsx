import React from 'react';

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
      console.log(this.state.companyValue);
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
            <form name="jobAdd" onSubmit={this.onSubmitHandler}>
              <input type="text" name="title" placeholder="Title"></input>
              <input type="number" name="personel" placeholder="Personel" step="1"></input>
              <input type="number" name="rate" placeholder="Rate" step="0.01"></input>
              <input type="text" name="description" placeholder="Description"></input>
              <input type="text" name="currency" placeholder="Currency"></input>
              <select name="representative">{this.createRepItems()}</select>
              <select name="location">{this.createLocItems()}</select>
              <input type="date" name="start" />
              <input type="date" name="end" />
              <button>Add</button>
            </form>
          )}
        </React.Fragment>
      );
    }
  }