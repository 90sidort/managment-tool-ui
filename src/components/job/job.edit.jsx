import React from 'react';
import { Link } from 'react-router-dom';

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
        rate: 0,
        currency: "PLN",
        description: "",
        status: "New",
        start: new Date(),
        end: new Date(),
        jobId: null,
        skills: [],
        availSkills: {}
    };
    this.onCompanySelectedHandler = this.onCompanySelectedHandler.bind(this);
    this.onValueChange = this.onValueChange.bind(this)
    this.onSubmitHandle = this.onSubmitHandle.bind(this)
  } 

  componentDidMount() {
    this.loadDetails(this.state.id).then(() => {
      this.loadRep(this.state.companyValue)
      this.loadLoc(this.state.companyValue)
    })
    this.loadCompany()
    this.loadSkills()
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadDetails(this.state.id).then(() => {
        this.loadRep(this.state.companyValue)
        this.loadLoc(this.state.companyValue)
      })
      this.loadCompany()
      this.loadSkills()
    }
  }

  onCompanySelectedHandler(e) {
    this.loadRep(e.target.value);
    this.loadLoc(e.target.value);
    this.setState({ companyValue: e.target.value });
  }

  onValueChange(e) {
    const value = e.target.value
    if (e.target.name === "skills") {
      let add = Array.from(e.target.selectedOptions, option => option.value);
      this.setState({skills: add});      
    }
    else if (e.target.name === "start" || e.target.name === "end") {
      this.setState({[e.target.name]: new Date(e.target.value)})
    }
    else {
      this.setState({
        ...this.state,
        [e.target.name]: value
      });
    }
  }

  onSubmitHandle(e) {
    e.preventDefault();
    const form = document.forms.jobEdit;
    const job = {
      company: form.company.value,
      representative: form.repValue.value,
      location: form.locValue.value,
      title: form.title.value,
      personel: parseInt(form.personel.value),
      rate: parseFloat(form.rate.value),
      currency: form.currency.value,
      description: form.description.value,
      skills: Array.from(form.skills.selectedOptions, option => option.value),
      status: form.status.value,
      start: new Date(form.start.value),
      end: new Date(form.end.value),
      created: new Date(),
    };
    this.updateData(this.state.id, job)
    this.props.history.push("/jobs")
  }

  createOptions(name, element) {
    const options = [];
    const optionArr = element
    for (let i = 0; i < optionArr.length; i++) {
      options.push(
        <option key={i} value={optionArr[i]._id}>
          {name === 'companies' && `${optionArr[i].name}`}
          {name === "skills" && `${optionArr[i].name}`}
          {name === 'rep' && `${optionArr[i].name}, ${optionArr[i].email}`}
          {name === 'loc' && `${optionArr[i].city}, ${optionArr[i].country}, ${optionArr[i].address}, ${optionArr[i].postcode}`}
        </option>
      );
    }
    if (name === "companies") {
      options.push(
        <option key={-1} value={-1} disabled>
          Select company
        </option>
      );
    }
    return options;
  }

  async updateData(_id, changes) {
    const query = `
      mutation updateJob($_id: ID, $changes: JobInput!){
        updateJob(_id: $_id, changes: $changes) {
        title
        rate
        currency
        }
      }
    `
    const data = await graphQLFetch(query, {_id, changes});
    if (data) {
      console.log('działa kurła');
    }
  }

  async loadCompany() {
    const query = `
    query {
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
  async loadSkills() {
    const query = `
    query getSkills {
      skill {
        _id
        name
      }
    }`
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ availSkills: data.skill })
    }
  }

  async loadRep(cid) {
    const query = `
    query getRep($cid: ID) {
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
    const query = `
    query getLocations($cid: ID) {
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

  async loadDetails(_id) {
    const query = `query getJob($_id: ID) {
      job(_id: $_id) {
        _id
        personel
        rate
        currency
        description
        skills {_id}
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

    const data = await graphQLFetch(query, { _id });
    if (data) {
      const setData = data.job[0]
      console.log(123, data.job[0]);
      this.setState({jobId: setData._id})
      this.setState({companyValue: setData.company._id})
      this.setState({repValue: setData.representative._id})
      this.setState({locValue: setData.location._id})
      this.setState({title: setData.title})
      this.setState({personel: setData.personel})
      this.setState({rate: setData.rate})
      this.setState({currency: setData.currency})
      this.setState({description: setData.description})
      this.setState({status: setData.status})
      this.setState({start: setData.start})
      this.setState({end: setData.end})
      this.setState({skills: setData.skills.map(function(skill) { return skill._id; })})
    }
  }

  render() {
    const {
      companies,
      companyValue,
      locValue, repValue,
      locations,
      representatives,
      title,
      personel,
      jobId,
      rate,
      currency,
      description,
      availSkills,
      skills,
      status
    } = this.state 
    console.log(this.state);
    const start = this.state.start.toISOString().split("T")[0]
    const end = this.state.end.toISOString().split("T")[0]
    return(
      <div>
      {jobId ? (
      <div>
        <Link to={`/details/${this.state.id}`}>Fullscreen view</Link>
        {' '}
        <Link to={`/jobs/${this.state.id}`}>Panel view</Link>
        <form name="jobEdit" onSubmit={this.onSubmitHandle}>
          <h3>Select company:</h3>
            {companies && companyValue &&
              <select
                name="company"
                id="company"
                value={companyValue}
                onChange={this.onCompanySelectedHandler}
              >
                {this.createOptions("companies", companies)}
              </select>
            }
          <h3>Select representative:</h3>
            {representatives && repValue &&
              <select
                name="repValue"
                value={repValue}
                onChange={this.onValueChange}
              >
                {this.createOptions("rep", representatives)}
              </select>
            }
          <h3>Select location:</h3>
            {locations && locValue &&
              <select
                name="locValue"
                value={locValue}
                onChange={this.onValueChange}
              >
                {this.createOptions("loc", locations)}
              </select>
            }
          <h3>Provide offer title</h3>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={this.onValueChange}
            />
          <h3>Provide offer representative</h3>
            <input
              type="number"
              name="personel"
              placeholder="Personel"
              step="1"
              value={personel}
              onChange={this.onValueChange}
            />
          <h3>Provide offer rate</h3>
            <input
              type="number"
              name="rate"
              step="1"
              value={rate}
              onChange={this.onValueChange}
            />
          <h3>Provide currency:</h3>
            <select
              name="currency"
              value={currency}
              onChange={this.onValueChange}
            >
              <option value="PLN">PLN</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          <h3>Provide description:</h3>
            <textarea
              name="description"
              value={description}
              onChange={this.onValueChange}
            />
          <h3>Provide skills:</h3>
            {availSkills && 
              <select
                name="skills"
                value={skills}
                onChange={this.onValueChange}
                multiple
              >
                {this.createOptions("skills", availSkills)}
              </select>
            }
          <h3>Define status:</h3>
            <select
              name="status"
              value={status}
              onChange={this.onValueChange}
            >
              <option value="New">New</option>
              <option value="Assigned">Assigned</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Signed">Signed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Closed">Closed</option>
            </select>
          <h3>Define start date:</h3>
            <input
              type="date"
              name="start"
              value={start}
              onChange={this.onValueChange}
            />
          <h3>Define end date:</h3>
            <input
              type="date"
              name="end"
              value={end}
              onChange={this.onValueChange}
            />
          <button type="submit">Save</button>
        </form>
      </div>
      ) : (
        <p>Job with this id not found.</p>
      )  
    }
    </div>
  )}
}