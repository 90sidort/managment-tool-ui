import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'whatwg-fetch';

import JobList from './components/job/job.list.jsx'

const element = <JobList />;

ReactDOM.render(element, document.getElementById('contents'));

if (module.hot) {
    module.hot.accept();
  }