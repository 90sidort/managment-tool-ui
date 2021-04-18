import React from 'react';
import { Button, Panel, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import withToast from '../toast.wrapper.jsx';
import graphQLFetch from '../../utils/graphqlFetch.js';
import authContext from '../../context/auth.context.js';
import { loadReps } from '../../utils/queries/job.queries';
import CompanyAdd from './rep.add.jsx';
import { createRepQuery, deleteRepQuery } from '../../utils/queries/company.queries.js';

class RepList extends React.Component {
    static contextType = authContext;
    constructor(props){
        super(props)
        this.state = {
            cid: this.props?.match.params.cid,
            reps: [],
        }
        this.createRep = this.createRep.bind(this);
    }

    componentDidMount() {
        const { cid } = this.state
        this.loadReps(cid)
    }

    onDeleteHandler(e, id){
        e.preventDefault();
        this.deleteRep(id);
    }

    async deleteRep(id){
        const { cid } = this.state;
        const { showError, showSuccess  } = this.props;
        const { token } = this.context;
        const query = deleteRepQuery;
        const data = await graphQLFetch(query, { _id: id }, showError, token);
        if(data){
            if(data.representativeDelete === true) {
                showSuccess('Representative deleted.');
                this.loadReps(cid)
            }
            else showError('Unable to delete - representative is used in job offers.');
        } else {
            showError('Unable to delete representative');
        }
    }

    async createRep(rep){
        const { cid } = this.state;
        const { showError, showSuccess  } = this.props
        const { token } = this.context
        const query = createRepQuery;
        const data = await graphQLFetch(query, { ...rep }, showError, token);
        if (data) {
            showSuccess('Representative created.')
            this.loadReps(cid)
        } else {
            showError('Unable to create.')
        }
    }

    async loadReps(cid) {
        const { showError } = this.props
        const { token } = this.context
        const query = loadReps;
        const data = await graphQLFetch(query, { cid }, showError, token);
        if (data) {
            this.setState({ reps: data.representative });
        } else {
            showError('Unable to load data.')
        }
    }

    render() {
        const { reps, cid } = this.state
        return (
            <div>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title toggle>Create new representative</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        < CompanyAdd cid={cid} createRep={this.createRep} />
                    </Panel.Body>
                </Panel>
                {reps && 
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Data</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reps && reps.map((rep, i) => {
                            return (
                                <tr key={rep._id}>
                                    <td>{i}</td>
                                    <td>{rep.name}</td>
                                    <td>{rep.email}</td>
                                    <td>{rep.phone}</td>
                                    <td><LinkContainer to={`/representative/${rep._id}/${cid}`}><Button size="lg">Edit</Button></LinkContainer></td>
                                    <td><LinkContainer to={`/representatives/${cid}`}><Button size="lg" onClick={(e) => this.onDeleteHandler(e, rep._id)}>Delete</Button></LinkContainer></td>
                                </tr>
                            )
                            })}
                        </tbody>
                    </Table>}
            </div>)
    }
}

const RepListWithToast = withToast(RepList);
export default RepListWithToast;