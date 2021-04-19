import React from 'react'

import authContext from '../../context/auth.context.js';
import withToast from '../toast.wrapper.jsx';
import graphQLFetch from '../../utils/graphqlFetch.js';
import { loadReps } from '../../utils/queries/job.queries.js';
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import repValidator from '../../utils/validators/rep.validator.js';
import { updateRepQuery } from '../../utils/queries/company.queries.js';

class RepEdit extends React.Component {
    static contextType = authContext;
    constructor(props){
        super(props)
        this.state = {
            cid: this.props?.match.params.cid,
            id: this.props?.match.params.id,
            rep: {
                name: "",
                email: "",
                phone: "",
                cid: undefined,
            },
            errors: {},
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.onSaveChanges = this.onSaveChanges.bind(this);
    }

    componentDidMount(){
        this.loadRepData(this.state.id)
    }

    onValueChange(e){
        const { value, name } = e.target;
        this.setState(prevState => ({
            rep: {
                ...prevState.rep,
                [name]: value,
            }
        }));
    };

    onSaveChanges(e){
        e.preventDefault();
        const { id, rep: {name, email, phone, cid} } = this.state;
        const errors = repValidator({name, email, phone});
        if (JSON.stringify(errors) === "{}") this.updateRepData(id, {name, email, phone, cid});
        else this.setState({errors})
    };

    dismissValidation(name) {
        const newErrors = {...this.state.errors}
        delete newErrors[name]
        this.setState({ errors: newErrors });
      }

    async loadRepData(id) {
        const { showError } = this.props
        const { token } = this.context
        const query = loadReps;
        const data = await graphQLFetch(query, { _id: id }, showError, token);
        if (data) {
            this.setState({ rep: data.representative[0] });
        } else {
            showError('Unable to load data.')
        }
    }

    async updateRepData(repId, repData) {
        console.log(repId, repData);
        const { showError, history } = this.props
        const { token } = this.context
        const query = updateRepQuery;
        const data = await graphQLFetch(query, { _id: repId, representative: repData }, showError, token);
        if (data) {
            history.push(`/representatives/${repData.cid}`)
        } else {
            showError('Unable to update.')
        }
    }

    render(){
        const { errors, rep } =this.state;
        return(
            <Form horizontal name="addRep" onSubmit={this.onSaveChanges}>
                {rep.cid ? (
                    <React.Fragment>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Name</Col>
                            <Col sm={6}>
                                <FormControl
                                    componentClass="input"
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={rep.name}
                                    placeholder="Provide representative name"
                                    onChange={this.onValueChange}
                                />
                                {errors.name && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("name")}>{errors.name}</Alert>}
                            </Col>
                            <Col sm={3} />
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Email</Col>
                            <Col sm={6}>
                                <FormControl
                                    componentClass="input"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={rep.email}
                                    placeholder="Provide representative email"
                                    onChange={this.onValueChange}
                                />
                                {errors.email && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("email")}>{errors.email}</Alert>}
                            </Col>
                            <Col sm={3} />
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={3}>Phone</Col>
                            <Col sm={6}>
                                <FormControl
                                    componentClass="input"
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={rep.phone}
                                    placeholder="Provide representative phone"
                                    onChange={this.onValueChange}
                                />
                                {errors.phone && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("phone")}>{errors.phone}</Alert>}
                            </Col>
                            <Col sm={3} />
                        </FormGroup>
                        <FormGroup>
                            <Col sm={3} />
                            <Col sm={6}>
                                <Button type="submit" bsStyle="success">Update representative</Button>
                            </Col>
                            <Col sm={3} />
                        </FormGroup>
                    </React.Fragment>
                ) : (<p>Unable to load data.</p>)}
            </Form>
        )
    }
}

const RepEditWithToast = withToast(RepEdit);
export default RepEditWithToast;