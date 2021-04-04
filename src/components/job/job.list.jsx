import React from 'react';
import { Route } from 'react-router';
import { Panel } from 'react-bootstrap';

import graphQLFetch from '../../utils/graphqlFetch'
import JobsFilter from "./job.filter.jsx"
import JobTable from "./job.table.jsx"
import JobAdd from "./job.add.jsx"
import JobPanel from './job.panel.jsx';
import withToast from '../toast.wrapper.jsx';
import Paginator from '../pagination.jsx'
import {
  createJobQuery,
  deleteJobQuery,
  jobListQuery,
  loadComapnyQuery
} from '../../utils/queries/job.queries';

class JobList extends React.Component {
    constructor() {
      super();
      this.state = {
        jobs: [],
        companies: [],
        toastVisible: false,
        toastMessage: ' ',
        toastType: 'success',
        pages: null,
        currentPage: 1
      };
      this.createJob = this.createJob.bind(this);
      this.deleteJob = this.deleteJob.bind(this);
      this.onChangePage = this.onChangePage.bind(this)
    }

    componentDidMount() {
      let savedPage
      if (this.props) {
        if (this.props.location.search.includes('page')) {
          console.log(22222, this.props.location.search);
          savedPage = parseInt(this.props.location.search.split('page')[1].match(/\d+/)[0])
          console.log(3333, savedPage);
          this.setState({currentPage: savedPage})
        }
      }
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

    onChangePage(e){
      const pageNum = parseInt(e.target.value)
      console.log(pageNum);
      this.setState({currentPage: pageNum})
      let { location: { search } } = this.props;
      const { history } = this.props;
      const params = new URLSearchParams(search);
      params.set('page', pageNum);
      search = params.toString() ? `?${params.toString()}` : '';
      history.push({ pathname: "/jobs", search });
      this.loadData()
    }

    async loadData() {
      const { location: { search }, showError } = this.props;
      const params = new URLSearchParams(search);
      const vars = {};

      if (params.get('page')) vars.page = params.get('page')
      if (params.get('status')) vars.status = params.get('status');
      if (params.get('title')) vars.title = params.get('title');
      if (params.get('company')) vars.company = params.get('company');
      const personMin = parseInt(params.get('personMin'), 10);
      if (!Number.isNaN(personMin)) vars.personMin = personMin;
      const personMax = parseInt(params.get('personMax'), 10);
      if (!Number.isNaN(personMax)) vars.personMax = personMax;

      const query = jobListQuery;
      const data = await graphQLFetch(query, vars, showError);
        if (data) {
          this.setState({ jobs: data.job.jobs });
          this.setState({pages: data.job.pages})
        } else {
          showError('Unable to load data')
        }
    }
  
    async loadCompany() {
      const { showError } = this.props
      const query = loadComapnyQuery;
      const data = await graphQLFetch(query, {}, showError);
      if (data) {
        this.setState({ companies: data.company });
      } else {
        showError('Unable to load data')
      }
    }
  
    async createJob(job) {
      const { showError, showSuccess } = this.props
      const query = createJobQuery;
  
      const data = await graphQLFetch(query, { job }, showError);
      if (data) {
        showSuccess('Job created successfully');
        this.loadData();
      } else {
        showError('Unable to create job')
      }
    }

    async deleteJob(_id) {
      const { showError, showSuccess } = this.props
      const query = deleteJobQuery;

      const data = await graphQLFetch(query, { _id }, showError);
      if (data) {
        showSuccess('Job deleted successfully');
        this.props.history.push("/jobs")
        this.loadData();
      } else {
        showError('Unable to delete job')
      }
    }
  
    render() {
      const { companies, jobs, pages, currentPage } = this.state
      console.log(this.props.location.search);
      return (
        <React.Fragment>
          <Panel>
            <Panel.Heading>
              <Panel.Title toggle>Filters</Panel.Title>    
            </Panel.Heading>
            <Panel.Body collapsible>
              <JobsFilter comp={companies} urlBase="/jobs" />
            </Panel.Body>
          </Panel>
          <JobTable jobs={jobs} />
          <Paginator pages={pages} currentPage={currentPage} changer={this.onChangePage} />
          <JobAdd createJob={this.createJob} comp={companies} />
          <Route path="/jobs/:id" render={(props) => (
            <React.Fragment>
              <hr />
                <JobPanel {...props} deleteJob={this.deleteJob} previous={this.props.location} />
              <hr />
            </React.Fragment>
          )} />
        </React.Fragment>
      );
    }
  }

const JobListWithToast = withToast(JobList);
export default JobListWithToast;