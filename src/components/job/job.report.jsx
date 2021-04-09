import React from 'react';
import { FormControl, Panel, Table } from 'react-bootstrap';

import withToast from '../toast.wrapper.jsx'
import graphQLFetch from '../../utils/graphqlFetch'
import AuthContext from "../../context/auth.context.js";
import { getStatusReport } from '../../utils/queries/job.queries.js';

class IssueReport extends React.Component {
  static contextType = AuthContext;
  constructor(){
    super()
    this.state = {
      subject: -1,
      stats: {}
    }
    this.onSubjectChangeHandler = this.onSubjectChangeHandler.bind(this)
  }

  async loadReport(subject){
    const { showError } = this.props
    const { token } = this.context
    const query = subject === 'status' ? getStatusReport : '';
    const data = await graphQLFetch(query, {}, showError, token);
    if (data) {
      this.setState({ stats: data.jobCount[0] });
    } else {
      showError('Unable to load data')
    }
  }

  onSubjectChangeHandler(e) {
    e.preventDefault()
    const subject = e.target.value
    this.setState({ subject })
    if (subject !== -1) this.loadReport(subject)
  }

  createTable(statistics) {
    if (Object.keys(statistics).length !== 0) {
      const headerTable = []
      const valueTable = []
      Object.getOwnPropertyNames(statistics).forEach(
        function (val, idx, array) {
          headerTable.push(val)
          valueTable.push(statistics[val])
        }
      );
      return {header: headerTable, value: valueTable}
    }
  }

  render() {
    const { stats } = this.state;
    if (stats == null) return null;
    const table = this.createTable(stats)
    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Select report type</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
          <FormControl
              componentClass="select"
              name="status"
              value={this.state.subject}
              id="company"
              onChange={this.onSubjectChangeHandler}
            >
              <option value={-1} disabled>Select option:</option>
              <option value="status">Status</option>
              {/* <option value="company">Company</option> */}
              </FormControl>
          </Panel.Body>
        </Panel>
        <Table bordered condensed hover responsive>
          <thead>
            <tr>
              {table && (
                table.header.map((name) => (<th key={name}>{name}</th>))
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              {table && (
                table.value.map((val, i) => (<td key={i}>{val}</td>))
              )}
            </tr>
          </tbody>
        </Table>
        {!table && <p className="text-center">Please, select an option.</p>}
    </React.Fragment>)
  }
}

const IssueReportWithToast = withToast(IssueReport)
export default IssueReportWithToast;