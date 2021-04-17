import React from 'react';

import withToast from '../toast.wrapper.jsx';
import graphQLFetch from '../../utils/graphqlFetch.js';
import { loadComapnyQuery } from '../../utils/queries/job.queries.js';
import { createCompanyQuery, deleteCompanyQuery } from '../../utils/queries/company.queries.js'
import authContext from '../../context/auth.context.js';
import { Button, Panel, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CompanyAdd from '../company/company.add.jsx';

class CompanyList extends React.Component {
    static contextType = authContext;
    constructor(){
        super()
        this.state = {
            companies: [],
        }
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.createCompany = this.createCompany.bind(this);
    }

    componentDidMount() {
        this.loadCompany()
    }

    onDeleteHandler(e, id){
        e.preventDefault();
        this.deleteCompany(id);
    }

    async deleteCompany(id) {
        const { showError } = this.props
        const { token } = this.context
        const query = deleteCompanyQuery;
        const data = await graphQLFetch(query, { _id: id }, showError, token);
        if (data) {
            if(data.companyDelete === true) this.loadCompany();
            else showError('Unable to delete - company is used in job offers.');
        } else {
            showError('Unable to delete company')
        }
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

    async createCompany(company) {
        const { showError } = this.props
        const { token } = this.context
        const query = createCompanyQuery;
        const data = await graphQLFetch(query, { company }, showError, token);
        if (data) {
            this.loadCompany()
        } else {
            showError('Unable to load data')
        }
    }

    render() {
        const { companies } = this.state
        return (
            <div>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title toggle>Provide company data</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <CompanyAdd createCompany={this.createCompany}/>
                    </Panel.Body>
                </Panel>
                {companies && 
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Industry</th>
                                <th>Data</th>
                                <th>Delete</th>
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
                                    <td><LinkContainer to={`/company`}><Button size="lg" onClick={(e) => this.onDeleteHandler(e, company._id)}>Delete</Button></LinkContainer></td>
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