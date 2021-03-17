import React from 'react';

import graphQLFetch from '../../utils/graphqlFetch';

export default class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
        id : this.props.match.params.id,
        companyValue: null,
        companies: {}
    };
  } 

  componentDidMount() {
    this.loadDetails(this.state.id);
    this.loadCompany()
  }

  onCompanySelectedHandler(e) {
    this.setState({ companyValue: parseInt(e.target.value) });
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
      this.setState({ companies: data.company });
    }
  }

  async loadDetails(id) {
    const query = `query getJob($id: ID) {
      job(id: $id) {
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
        company {name}
        status
        start
        end
      }
    }`;

    const data = await graphQLFetch(query, { id });
    if (data) {
      this.setState({ details: data.job });
      this.setState({companyValue: data.job._id})
    }
  }

  render() {
    const details = this.state.details[0]
    const companies = this.state.companies
    console.log(123, companies);
    console.log(321, details);
    return(<div>
      <a href={`/#/details/${this.state.id}`}>Go back</a>
      {companies && <select
              name="company"
              id="company"
              defaultValue={this.state.companyValue}
              onChange={this.onCompanySelectedHandler}
            >
              {this.createCompItems()}
        </select>}

      <p>{details && details._id}</p>
    </div>)
  }
}