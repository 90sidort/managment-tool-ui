import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import JobList from './job/job.list.jsx';
import JobDetails from './job/job.details.jsx';
import JobEdit from "./job/job.edit.jsx"
import IssueReportWithToast from './job/job.report.jsx';
import AuthPage from './auth/auth.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/jobs" />
      <Route path="/auth" component={AuthPage} />
      <Route path="/jobs" component={JobList} />
      <Route path="/details/:id" component={JobDetails} />
      <Route path="/edit/:id" component={JobEdit} />
      <Route path="/reports" component={IssueReportWithToast} />
      <Route component={NotFound} />
    </Switch>
  );
}
