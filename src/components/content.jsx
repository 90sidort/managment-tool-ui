import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import JobList from './job/job.list.jsx';
import JobDetails from './job/job.details.jsx';
import JobEdit from "./job/job.edit.jsx"
import IssueReport from './job/job.report.jsx';
import AuthPage from './auth/auth.jsx';
import AuthContext from '../context/auth.context.js';
import SkillList from './skill/skill.list.jsx';
import CompanyList from './company/company.list.jsx'
import EditCompanyWithToast from './company/company.edit.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  console.log('KURWA', CompanyList);
  return (
    <AuthContext.Consumer>
    {(context) => {
      console.log(context);
      return (
        <Switch>
          {context.token && <Redirect exact from="/" to="/jobs" />}
          {context.token && <Redirect exact from="/auth" to="/jobs" />}
          {!context.token && <Route path="/auth" component={AuthPage} />}
          {context.token && <Route path="/jobs" component={JobList} />}
          {context.token && <Route path="/details/:id" component={JobDetails} />}
          {context.token && <Route path="/edit/:id" component={JobEdit} />}
          {context.token && <Route path="/reports" component={IssueReport} />}
          {context.token && <Route path="/skills" component={SkillList} />}
          {context.token && <Route path="/company/:id" component={EditCompanyWithToast} />}
          {context.token && <Route path="/company" component={CompanyList} />}
          {!context.token && <Redirect to="/auth" exact />}
          <Route component={NotFound} />
      </Switch>
      )
    }}
    </AuthContext.Consumer>

  );
}
