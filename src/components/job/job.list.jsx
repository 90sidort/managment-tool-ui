import React from 'react';

import graphQLFetch from '../../utils/graphqlFetch'
import JobsFilter from "./job.filter.jsx"
import JobTable from "./job.table.jsx"
import JobAdd from "./job.add.jsx"
import SkillList from "../skill/skill.list.jsx"

export default class JobList extends React.Component {
    constructor() {
      super();
      this.state = {
        jobs: [],
        companies: [],
      };
      this.createJob = this.createJob.bind(this);
    }
  
    componentDidMount() {
      this.loadData();
      this.loadCompany();
    }
  
    async loadData() {
      const query = `
      query {
        job {
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
      const data = await graphQLFetch(query);
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
  
    render() {
      return (
        <React.Fragment>
          <h1>Job Tracker</h1>
          <JobsFilter />
          <hr />
          <JobTable jobs={this.state.jobs} />
          <hr />
          <JobAdd createJob={this.createJob} comp={this.state.companies} />
          <hr />
          <SkillList />
        </React.Fragment>
      );
    }
  }