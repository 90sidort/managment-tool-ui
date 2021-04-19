import React from 'react'

import authContext from '../../context/auth.context.js';
import withToast from '../toast.wrapper.jsx';
import graphQLFetch from '../../utils/graphqlFetch.js';
import { loadLoc } from '../../utils/queries/job.queries.js';
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import locValidator from '../../utils/validators/loc.validator.js';
import { updateLocQuery } from '../../utils/queries/company.queries.js';

class LocEdit extends React.Component {
    static contextType = authContext;
    constructor(props){
        super(props)
        this.state = {
            cid: this.props?.match.params.cid,
            id: this.props?.match.params.id,
            loc: {
                address: "",
                postcode: "",
                city: "",
                country: "",
                cid: undefined,
            },
            errors: {},
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.onSaveChanges = this.onSaveChanges.bind(this);
    }

    componentDidMount(){
        this.loadLocData(this.state.id)
    }

    onValueChange(e){
        const { value, name } = e.target;
        this.setState(prevState => ({
            loc: {
                ...prevState.loc,
                [name]: value,
            }
        }));
    };

    onSaveChanges(e){
        e.preventDefault();
        const { id, loc: {address, postcode, city, country, cid} } = this.state;
        const errors = locValidator({address, postcode, city, country});
        if (JSON.stringify(errors) === "{}") this.updateLocData(id, {address, postcode, city, country, cid});
        else this.setState({errors})
    };

    dismissValidation(name) {
        const newErrors = {...this.state.errors}
        delete newErrors[name]
        this.setState({ errors: newErrors });
      }

    async loadLocData(id) {
        const { showError } = this.props
        const { token } = this.context
        const query = loadLoc;
        const data = await graphQLFetch(query, { _id: id }, showError, token);
        if (data) {
            this.setState({ loc: data.location[0] });
        } else {
            showError('Unable to load data.')
        }
    }

    async updateLocData(locId, locData) {
        const { showError, history } = this.props
        const { token } = this.context
        const query = updateLocQuery;
        const data = await graphQLFetch(query, { _id: locId, location: locData }, showError, token);
        if (data) {
            history.push(`/locations/${locData.cid}`)
        } else {
            showError('Unable to update.')
        }
    }

    render(){
        const { errors, loc } =this.state;
        return(
            <Form horizontal name="addRep" onSubmit={this.onSaveChanges}>
                {loc.cid ? (
                    <React.Fragment>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Address</Col>
                            <Col sm={6}>
                                <FormControl
                                    componentClass="input"
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={loc.address}
                                    placeholder="Provide address"
                                    onChange={this.onValueChange}
                                />
                                {errors.address && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("address")}>{errors.address}</Alert>}
                            </Col>
                            <Col sm={3} />
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Postcode</Col>
                            <Col sm={6}>
                                <FormControl
                                    componentClass="input"
                                    type="text"
                                    name="postcode"
                                    id="postcode"
                                    value={loc.postcode}
                                    placeholder="Provide postcode"
                                    onChange={this.onValueChange}
                                />
                                {errors.postcode && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("postcode")}>{errors.postcode}</Alert>}
                            </Col>
                            <Col sm={3} />
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>City</Col>
                            <Col sm={6}>
                                <FormControl
                                    componentClass="input"
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={loc.city}
                                    placeholder="Provide city"
                                    onChange={this.onValueChange}
                                />
                                {errors.city && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("city")}>{errors.city}</Alert>}
                            </Col>
                            <Col sm={3} />
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Country</Col>
                            <Col sm={6}>
                                <FormControl
                                    componentClass="input"
                                    type="text"
                                    name="country"
                                    id="country"
                                    value={loc.country}
                                    placeholder="Provide country"
                                    onChange={this.onValueChange}
                                />
                                {errors.country && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("country")}>{errors.country}</Alert>}
                            </Col>
                            <Col sm={3} />
                        </FormGroup>
                        <FormGroup>
                            <Col sm={3} />
                            <Col sm={6}>
                                <Button type="submit" bsStyle="success">Update location</Button>
                            </Col>
                            <Col sm={3} />
                        </FormGroup>
                    </React.Fragment>
                ) : (<p>Unable to load data.</p>)}
            </Form>
        )
    }
}

const LocEditWithToast = withToast(LocEdit);
export default LocEditWithToast;