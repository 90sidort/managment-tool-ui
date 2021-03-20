import React from 'react';
import { withRouter } from 'react-router-dom';

class JobsFilter extends React.Component {
  constructor() {
    super();
    this.onStatusChange = this.onStatusChange.bind(this);
  }

   onStatusChange(e) {
    const status = e.target.value
    console.log(status);
    const { history } = this.props;
    history.push({
      pathname: '/jobs',
      search: status ? `?status=${status}` : '',
    });
   }

  render() {
    return (<div>
      Status:
      {' '}
      <select onChange={this.onStatusChange}>
        <option value="">All</option>
        <option value="New">New</option>
        <option value="Assigned">Assigned</option>
        <option value="Negotiation">Negotiation</option>
        <option value="Signed">Signed</option>
        <option value="Ongoing">Ongoind</option>
        <option value="Closed">Closed</option>
      </select>
    </div>);
  }
}

export default withRouter(JobsFilter)