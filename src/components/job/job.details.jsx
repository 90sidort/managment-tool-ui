import React from 'react';

import graphQLFetch from '../../utils/graphqlFetch';

export default class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
        id : this.props.match.params.id
    };
  }

  componentDidMount() {
    this.loadDetails(this.state.id);
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
    }
  }

  render() {
    const details = this.state.details[0]
    console.log(details);
    return (
      <div>
        <a href={`/#/edit/${this.state.id}`}>Edit</a>
        <h3>Job details</h3>
        {details && (
          <div>
            <h4>Title: {details.title}</h4>
            <h4>Company: {details.company.name}</h4>
            <h4>Personel: {details.personel}</h4>
            <h4>Rate: {details.rate}</h4>
            <h4>Currency: {details.currency}</h4>
            <h4>Description: {details.description}</h4>
            <h4>Loaction:</h4>
            <p>Address: {details.location.address}</p>
            <p>City: {details.location.city}</p>
            <p>Country: {details.location.country}</p>
            <p>Postcode: {details.location.postcode}</p>
            <h4>Representative:</h4>
            <p>Name: {details.representative.name}</p>
            <p>Email: {details.representative.email}</p>
            <p>Phone: {details.representative.phone}</p>
            <h4>Agent:</h4>
            {details.agent ? (
              <div>
                <p>Name: {details.agent.name}</p>
                <p>Email: {details.agent.email}</p>
                <p>Phone: {details.agent.phone}</p>
              </div>
            ) : ('Assign to agent')}
            <h4>Skills:</h4>
              <div>
                {details.skills.length > 0 ? (details.skills.map((skil) => <p>{skill.name}</p>) ) : ("Provide skills")}
              </div>
            <h4>Status: {details.status}</h4>
            <h4>Start: {details.start.toISOString()}</h4>
            <h4>End: {details.end.toISOString()}</h4>
          </div>
        )}
      </div>
    );
  }
}

