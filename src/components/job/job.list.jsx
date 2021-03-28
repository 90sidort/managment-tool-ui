import React from 'react';
import { Route } from 'react-router';

import graphQLFetch from '../../utils/graphqlFetch'
import JobsFilter from "./job.filter.jsx"
import JobTable from "./job.table.jsx"
import JobAdd from "./job.add.jsx"
import SkillList from "../skill/skill.list.jsx"
import JobPanel from './job.panel.jsx';
import { Panel } from 'react-bootstrap';

export default class JobList extends React.Component {
    constructor() {
      super();
      this.state = {
        jobs: [],
        companies: [],
      };
      this.createJob = this.createJob.bind(this);
      this.deleteJob = this.deleteJob.bind(this)
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
      const data = await graphQLFetch(query, vars);
      if (data) {
        this.setState({ jobs: data.job });
      }
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
  
    async createJob(job) {
      const query = `mutation addNewJob($job: JobInput!) { jobAdd(job: $job) {title, _id}} `;
  
      const data = await graphQLFetch(query, { job });
      if (data) {
        this.loadData();
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
        this.props.history.push("/jobs")
        this.loadData();
      }
    }
  
    render() {
      return (
        <React.Fragment>
          <Panel>
            <Panel.Heading>
              <Panel.Title toggle>Filters</Panel.Title>    
            </Panel.Heading>
            <Panel.Body collapsible>
              <JobsFilter comp={this.state.companies} />
            </Panel.Body>
          </Panel>
          <JobTable jobs={this.state.jobs} />
          <hr />
          <JobAdd createJob={this.createJob} comp={this.state.companies} />
          <hr />
          <Route path="/jobs/:id" render={(props) => (<JobPanel {...props} deleteJob={this.deleteJob} />)} />
          <hr />
          <SkillList />
        </React.Fragment>
      );
    }
  }