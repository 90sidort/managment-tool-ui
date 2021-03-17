import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import 'babel-polyfill';
import 'whatwg-fetch';

import Page from './components/page.jsx';

const element = (
  <Router>
    <Page />
  </Router>
)

ReactDOM.render(element, document.getElementById('contents'));

if (module.hot) {
    module.hot.accept();
  }