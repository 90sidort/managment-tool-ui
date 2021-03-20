import React from 'react';

import graphQLFetch from '../../utils/graphqlFetch';

export default class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id : this.props.match.params.id,
        companyValue: null,
        companies: {},
        representatives: {},
        locations: {},
        repValue: null,
        locValue: null,
        title: "",
        personel: 0,
    };
    this.onCompanySelectedHandler = this.onCompanySelectedHandler.bind(this);
    this.onLocationSelectHandler = this.onLocationSelectHandler.bind(this);
    this.onRepSelectHandler = this.onRepSelectHandler.bind(this);
    this.onInputChange = this.onInputChange.bind(this)
  } 

  componentDidMount() {
    this.loadDetails(this.state.id).then(() => {
      this.loadRep(this.state.companyValue)
      this.loadLoc(this.state.companyValue)
    })
    this.loadCompany()
  }

  async loadRep(cid) {
    console.log('cid', cid);
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

  onCompanySelectedHandler(e) {
    this.loadRep(e.target.value);
    this.loadLoc(e.target.value);
    this.setState({ companyValue: e.target.value });
  }

  onLocationSelectHandler(e) {
    this.setState({ locValue: e.target.value });
  }

  onRepSelectHandler(e) {
    this.setState({ repValue: e.target.value });
  }

  onInputChange(e) {
    const value = e.target.value
    this.setState({
      ...this.state,
      [e.target.name]: value
    });
  }

  createCompItems() {
    const options = [];
    const comps = this.state.companies;
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

  async loadCompany() {
    const query = `query {
      company {
        _id
        name
      }
    }`;
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ companies: data.company })
    }
  }

  async loadDetails(id) {
    console.log(id);
    const query = `query getJob($_id: ID) {
      job(_id: $_id) {
        _id
        personel
        rate
        currency
        description
        skills {name}
        agent { name _id cid email phone}
        representative { name _id cid email phone}
        location { country address postcode city cid _id}
        title
        company {_id name}
        status
        start
        end
      }
    }`;

    const data = await graphQLFetch(query, { id });
    if (data) {
      console.log(data.job[0]);
      const setData = data.job[0]
      console.log(3210, setData);
      this.setState({companyValue: setData.company._id})
      this.setState({repValue: setData.representative._id})
      this.setState({locValue: setData.location._id})
      this.setState({title: setData.title})
      this.setState({personel: setData.personel})
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

  render() {
    const companies = this.state.companies
    const compValue = this.state.companyValue
    const locValue = this.state.locValue
    const repValue = this.state.repValue
    const loc = this.state.locations
    const rep = this.state.representatives
    const title = this.state.title
    const personel = this.state.personel
    console.log('a',this.props.match.params);
    console.log('p', personel);
    return(<div>
      <a href={`/#/details/${this.state.id}`}>Go back</a>
      <h3>Select company:</h3>
      {companies && compValue && <select
              name="company"
              id="company"
              value={compValue}
              onChange={this.onCompanySelectedHandler}
            >
              {this.createCompItems()}
        </select>}
        <h3>Select representative:</h3>
        {rep && repValue && <select name="representative" value={repValue} onChange={this.onRepSelectHandler}>{this.createRepItems()}</select>}
        <h3>Select location:</h3>
        {loc && locValue && <select name="location" value={locValue} onChange={this.onLocationSelectHandler}>{this.createLocItems()}</select>}
        <h3>Provide offer title</h3>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.onInputChange}
            />
        <h3>Provide offer personel</h3>
            <input
              type="number"
              name="personel"
              placeholder="Personel"
              step="1"
              value={this.state.personel}
              onChange={this.onInputChange}
            />
    </div>)
  }
}