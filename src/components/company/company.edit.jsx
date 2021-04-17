import React from 'react';

import withToast from '../toast.wrapper.jsx';
import { loadComapnyQuery } from '../../utils/queries/job.queries.js';
import graphQLFetch from '../../utils/graphqlFetch.js';
import authContext from '../../context/auth.context.js';
import {
    Alert,
    Button,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Panel
} from 'react-bootstrap';
import { updateCompanyQuery } from '../../utils/queries/company.queries.js';
import companyValidator from '../../utils/validators/company.validator.js'

class EditCompany extends React.Component {
    static contextType = authContext;
    constructor(props){
        super(props);
        this.state = {
            company: {
                name: "",
                description: "",
                industry: ""
            },
            errors: {},
            cid: this.props.match.params.id,
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onSaveChanges = this.onSaveChanges.bind(this);
    };

    componentDidMount(){
        const { cid } = this.state;
        this.loadCompanyData(cid);
    }

    onValueChange(e){
        const { value, name } = e.target;
        this.setState(prevState => ({
            company: {
                ...prevState.company,
                [name]: value,
            }
        }));
    };

    onSaveChanges(e){
        e.preventDefault();
        const { cid, company: {name, description, industry} } = this.state;
        const errors = companyValidator({name, description, industry});
        if (JSON.stringify(errors) === "{}") this.updateCompanyData(cid, {name, description, industry});
        else this.setState({errors})
    };

    dismissValidation(name) {
        const newErrors = {...this.state.errors}
        delete newErrors[name]
        this.setState({ errors: newErrors });
      }

    async loadCompanyData(cid){
        const { showError } = this.props;
        const { token } = this.context;
        const query = loadComapnyQuery;
        const data = await graphQLFetch(query, { _id: cid }, showError, token);
        if (data) {
            this.setState({company: data.company[0]});
        } else {
          showError('Unable to load');
        };
    };

    async updateCompanyData(cid, company){
        const { showError, history } = this.props;
        const { token } = this.context;
        const query = updateCompanyQuery;
        const data = await graphQLFetch(query, { _id: cid, company  }, showError, token);
        if (data) {
            history.push("/company")
        } else {
          showError('Unable to load');
        };
    };

    render(){
        const { company, errors } = this.state;
        return(
            <div>
                {company && (
                    <Panel>
                        <Panel.Heading>
                        <h4>Editing company data</h4>
                        </Panel.Heading>
                        <Form horizontal onSubmit={this.onSaveChanges}>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>Name</Col>
                                <Col sm={8}>
                                    <FormControl
                                        componentClass="input"
                                        name="name"
                                        id="name"
                                        value={company.name}
                                        onChange={this.onValueChange}
                                    />
                                    {errors.name && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("name")}>{errors.name}</Alert>}
                                </Col>
                                <Col sm={2} />
                          </FormGroup>
                          <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>Industry</Col>
                                <Col sm={8}>
                                    <FormControl
                                        componentClass="select"
                                        name="industry"
                                        id="industry"
                                        value={company.industry}
                                        onChange={this.onValueChange}
                                    >
                                        <option value="Services">Services</option>
                                        <option value="Agriculture">Agriculture</option>
                                        <option value="Manufacturing">Manufacturing</option>
                                    </FormControl>
                                    {errors.industry && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("industry")}>{errors.industry}</Alert>}
                                </Col>
                                <Col sm={2} />
                          </FormGroup>
                          <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>Description</Col>
                                <Col sm={8}>
                                    <FormControl
                                        componentClass="input"
                                        name="description"
                                        id="description"
                                        value={company.description}
                                        onChange={this.onValueChange}
                                    />
                                    {errors.description && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("description")}>{errors.description}</Alert>}
                                </Col>
                                <Col sm={2} />
                          </FormGroup>
                          <FormGroup>
                            <Col sm={2} />
                            <Col sm={8}>
                                <Button bsStyle="success" type="submit">Save</Button>
                            </Col>
                            <Col sm={2} />
                           </FormGroup>
                        </Form>
                    </Panel>
                )}
            </div>
        );
    };
};

const EditCompanyWithToast = withToast(EditCompany);
export default EditCompanyWithToast;