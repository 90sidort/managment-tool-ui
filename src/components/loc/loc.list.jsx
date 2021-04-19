import React from 'react';
import { Button, Panel, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import withToast from '../toast.wrapper.jsx';
import LocationAdd from './loc.add.jsx';
import graphQLFetch from '../../utils/graphqlFetch.js';
import authContext from '../../context/auth.context.js';
import { loadLoc } from '../../utils/queries/job.queries';
import { createLocQuery, deleteLocQuery } from '../../utils/queries/company.queries.js';

class LocList extends React.Component {
    static contextType = authContext;
    constructor(props){
        super(props)
        this.state = {
            cid: this.props?.match.params.cid,
            locs: [],
        }
        this.createLocation = this.createLocation.bind(this);
    }

    componentDidMount() {
        const { cid } = this.state
        this.loadLocs(cid)
    }

    onDeleteHandler(e, id){
        e.preventDefault();
        this.deleteRep(id);
    }

    async deleteRep(id){
        const { cid } = this.state;
        const { showError, showSuccess  } = this.props;
        const { token } = this.context;
        const query = deleteLocQuery;
        const data = await graphQLFetch(query, { _id: id }, showError, token);
        if(data){
            if(data.locationDelete === true) {
                showSuccess('Location deleted.');
                this.loadLocs(cid)
            }
            else showError('Unable to delete - location is used in job offers.');
        } else {
            showError('Unable to delete location');
        }
    }

    async createLocation(location){
        const { cid } = this.state;
        const { showError, showSuccess  } = this.props
        const { token } = this.context
        const query = createLocQuery;
        const data = await graphQLFetch(query, { location }, showError, token);
        if (data) {
            showSuccess('Location created.')
            this.loadLocs(cid)
        } else {
            showError('Unable to create.')
        }
    }

    async loadLocs(cid) {
        const { showError } = this.props
        const { token } = this.context
        const query = loadLoc;
        const data = await graphQLFetch(query, { cid }, showError, token);
        if (data) {
            this.setState({ locs: data.location });
        } else {
            showError('Unable to load data.')
        }
    }

    render() {
        const { locs, cid } = this.state
        return (
            <div>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title toggle>Create new location</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        < LocationAdd cid={cid} createLocation={this.createLocation} />
                    </Panel.Body>
                </Panel>
                {locs && 
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Address</th>
                                <th>Post Code</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Data</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locs.map((loc, i) => {
                            return (
                                <tr key={loc._id}>
                                    <td>{i}</td>
                                    <td>{loc.address}</td>
                                    <td>{loc.postcode}</td>
                                    <td>{loc.city}</td>
                                    <td>{loc.country}</td>
                                    <td><LinkContainer to={`/location/${loc._id}/${cid}`}><Button size="lg">Edit</Button></LinkContainer></td>
                                    <td><LinkContainer to={`/locations/${cid}`}><Button size="lg" onClick={(e) => this.onDeleteHandler(e, loc._id)}>Delete</Button></LinkContainer></td>
                                </tr>
                            )
                            })}
                        </tbody>
                    </Table>}
            </div>)
    }
}

const LocListWithToast = withToast(LocList);
export default LocListWithToast;