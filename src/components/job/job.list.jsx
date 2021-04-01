import React from 'react';
import { Route } from 'react-router';
import { Panel } from 'react-bootstrap';

import graphQLFetch from '../../utils/graphqlFetch'
import JobsFilter from "./job.filter.jsx"
import JobTable from "./job.table.jsx"
import JobAdd from "./job.add.jsx"
import JobPanel from './job.panel.jsx';
import Toast from '../toast.jsx'

export default class JobList extends React.Component {
    constructor() {
      super();
      this.state = {
        jobs: [],
        companies: [],
        toastVisible: false,
        toastMessage: ' ',
        toastType: 'success',
      };
      this.createJob = this.createJob.bind(this);
      this.deleteJob = this.deleteJob.bind(this)
      this.showSuccess = this.showSuccess.bind(this);
      this.showError = this.showError.bind(this);
      this.dismissToast = this.dismissToast.bind(this);
    }
  
    componentDidMount() {
      this.loadData();
      this.loadCompany();
    }

    componentDidUpdate(prevProps) {
      const { location: { search: prevSearch } } = prevProps;
      const { location: { search } } = this.props;
      if (prevSearch !== search) {
        this.loadData();
      }
    }

    showSuccess(message) {
      this.setState({
        toastVisible: true, toastMessage: message, toastType: 'success',
      });
    }

    showError(message) {
      this.setState({
        toastVisible: true, toastMessage: message, toastType: 'danger',
      });
    }
    
    dismissToast() {
      this.setState({ toastVisible: false });
    }
  
    async loadData() {
      const { location: { search } } = this.props;
      const params = new URLSearchParams(search);
      const vars = {};

      if (params.get('status')) vars.status = params.get('status');
      if (params.get('title')) vars.title = params.get('title');
      if (params.get('company')) vars.company = params.get('company');
      const personMin = parseInt(params.get('personMin'), 10);
      if (!Number.isNaN(personMin)) vars.personMin = personMin;
      const personMax = parseInt(params.get('personMax'), 10);
      if (!Number.isNaN(personMax)) vars.personMax = personMax;

      const query = `query getJob(
        $_id: ID,
        $title: String,
        $currency: String,
        $status: String,
        $company: ID,
        $personMin: Int,
        $personMax: Int) {
        job(
          _id: $_id,
          title: $title,
          currency: $currency,
          status: $status,
          company: $company,
          personMin: $personMin,
          personMax: $personMax
        ) {
            _id
            personel
            representative { name _id cid email phone}
            location { country address postcode city cid _id}
            title
            company {name}
            status
            start
            end
        }
      }
      `;
      const data = await graphQLFetch(query, vars, this.showError);
        if (data) {
          this.setState({ jobs: data.job });
        } else {
          this.showError('Unable to load data')
        }
    }
  
    async loadCompany() {
      const query = `query {
        company {
          _id
          name
        }
      }`;
      const data = await graphQLFetch(query, {}, this.showError);
      if (data) {
        this.setState({ companies: data.company });
      } else {
        this.showError('Unable to load data')
      }
    }
  
    async createJob(job) {
      const query = `mutation addNewJob($job: JobInput!) { jobAdd(job: $job) {title, _id}} `;
  
      const data = await graphQLFetch(query, { job }, this.showError);
      if (data) {
        this.showSuccess('Job created successfully');
        this.loadData();
      } else {
        this.showError('Unable to create job')
      }
    }

    async deleteJob(_id) {
      const query = `
      mutation deleteJob($_id: ID!) {
        jobDelete(_id: $_id)
      }
      `

      const data = await graphQLFetch(query, { _id });
      if (data) {
        this.showSuccess('Job deleted successfully');
        this.props.history.push("/jobs")
        this.loadData();
      } else {
        this.showError('Unable to delete job')
      }
    }
  
    render() {
      const { toastVisible, toastMessage, toastType } = this.state;
      return (
        <React.Fragment>
          <Panel>
            <Panel.Heading>
              <Panel.Title toggle>Filters</Panel.Title>    
            </Panel.Heading>
            <Panel.Body collapsible>
              <JobsFilter comp={this.state.companies} />
            </Panel.Body>
            <Toast
              showing={toastVisible}
              onDismiss={this.dismissToast}
              bsStyle={toastType}
            >
            {toastMessage}
            </Toast>
          </Panel>
          <JobTable jobs={this.state.jobs} />
          <hr />
          <JobAdd createJob={this.createJob} comp={this.state.companies} />
          <Route path="/jobs/:id" render={(props) => (
            <React.Fragment>
              <hr />
                <JobPanel {...props} deleteJob={this.deleteJob} />
              <hr />
            </React.Fragment>
          )} />
        </React.Fragment>
      );
    }
  }