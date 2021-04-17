import React from 'react';

import withToast from '../toast.wrapper.jsx';
import graphQLFetch from '../../utils/graphqlFetch.js';
import { loadComapnyQuery } from '../../utils/queries/job.queries.js';
import authContext from '../../context/auth.context.js';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class CompanyList extends React.Component {
    static contextType = authContext;
    constructor(){
        super()
        this.state = {
            companies: []
        }
    }

    componentDidMount() {
        this.loadCompany()
    }

    async loadCompany() {
        const { showError } = this.props
        const { token } = this.context
        const query = loadComapnyQuery;
        const data = await graphQLFetch(query, {}, showError, token);
        if (data) {
          this.setState({ companies: data.company });
        } else {
          showError('Unable to load data')
        }
      }

    render() {
        const { companies } = this.state
        return (
            <div>
                {companies && 
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Industry</th>
                                <th>Data</th>
                                <th>Locations</th>
                                <th>Representatives</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies && companies.map((company, i) => {
                            console.log(company);
                            return (
                                <tr key={company._id}>
                                    <td>{i}</td>
                                    <td>{company.name}</td>
                                    <td>{company.description}</td>
                                    <td>{company.industry}</td>
                                    <td><LinkContainer to={`/company/${company._id}`}><Button size="lg">Edit</Button></LinkContainer></td>
                                    <td><LinkContainer to="/"><Button size="lg">Representatives</Button></LinkContainer></td>
                                    <td><LinkContainer to="/"><Button size="lg">Locations</Button></LinkContainer></td>
                                </tr>
                            )
                            })}
                        </tbody>
                    </Table>}
            </div>)
    }
}

const CompanyListWithToast = withToast(CompanyList);
export default CompanyListWithToast;