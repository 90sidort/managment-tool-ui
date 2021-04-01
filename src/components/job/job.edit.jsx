import React from 'react';
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Glyphicon,
  OverlayTrigger,
  Panel,
  Tooltip,
  Alert
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import graphQLFetch from '../../utils/graphqlFetch';
import editValidation from '../../utils/editValidation'
import Toast from '../toast.jsx'

export default class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id : this.props.match.params.id,
        companyValue: null,
        companies: {},
        representatives: {},
        locations: {},
        repValue: null,
        locValue: null,
        title: "",
        personel: 0,
        rate: 0,
        currency: "PLN",
        description: "",
        status: "New",
        start: new Date(),
        end: new Date(),
        jobId: null,
        skills: [],
        availSkills: {},
        errors: {},
        toastVisible: false,
        toastMessage: ' ',
        toastType: 'success',
    };
    this.onCompanySelectedHandler = this.onCompanySelectedHandler.bind(this);
    this.onValueChange = this.onValueChange.bind(this)
    this.onSubmitHandle = this.onSubmitHandle.bind(this)
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  } 

  componentDidMount() {
    this.loadDetails(this.state.id).then(() => {
      this.loadRep(this.state.companyValue)
      this.loadLoc(this.state.companyValue)
    })
    this.loadCompany()
    this.loadSkills()
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadDetails(this.state.id).then(() => {
        this.loadRep(this.state.companyValue)
        this.loadLoc(this.state.companyValue)
      })
      this.loadCompany()
      this.loadSkills()
    }
  }

  onCompanySelectedHandler(e) {
    this.loadRep(e.target.value);
    this.loadLoc(e.target.value);
    this.setState({ companyValue: e.target.value });
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }
  
  dismissToast() {
    this.setState({ toastVisible: false });
  }

  onValueChange(e) {
    const value = e.target.value
    if (e.target.name === "skills") {
      let add = Array.from(e.target.selectedOptions, option => option.value);
      this.setState({skills: add});      
    }
    else if (e.target.name === "start" || e.target.name === "end") {
      this.setState({[e.target.name]: new Date(e.target.value)})
    }
    else {
      this.setState({
        ...this.state,
        [e.target.name]: value
      });
    }
  }

  dismissValidation(name) {
    const newErrors = {...this.state.errors}
    delete newErrors[name]
    console.log(newErrors);
    this.setState({ errors: newErrors });
  }

  onSubmitHandle(e) {
    e.preventDefault();
    const form = document.forms.jobEdit;
    const job = {
      company: form.company.value,
      representative: form.repValue.value,
      location: form.locValue.value,
      title: form.title.value,
      personel: parseInt(form.personel.value),
      rate: parseFloat(form.rate.value),
      currency: form.currency.value,
      description: form.description.value,
      skills: Array.from(form.skills.selectedOptions, option => option.value),
      status: form.status.value,
      start: new Date(form.start.value),
      end: new Date(form.end.value),
      created: new Date(),
    };
    const errors = editValidation(job)
    if (JSON.stringify(errors) === "{}") {
      this.setState({errors})
      this.updateData(this.state.id, job)
      this.props.history.push("/jobs")
    } else {
      this.setState({errors})
    }
  }

  createOptions(name, element) {
    const options = [];
    const optionArr = element
    for (let i = 0; i < optionArr.length; i++) {
      options.push(
        <option key={i} value={optionArr[i]._id}>
          {name === 'companies' && `${optionArr[i].name}`}
          {name === "skills" && `${optionArr[i].name}`}
          {name === 'rep' && `${optionArr[i].name}, ${optionArr[i].email}`}
          {name === 'loc' && `${optionArr[i].city}, ${optionArr[i].country}, ${optionArr[i].address}, ${optionArr[i].postcode}`}
        </option>
      );
    }
    if (name === "companies") {
      options.push(
        <option key={-1} value={-1} disabled>
          Select company
        </option>
      );
    }
    return options;
  }

  async updateData(_id, changes) {
    const query = `
      mutation updateJob($_id: ID, $changes: JobInput!){
        updateJob(_id: $_id, changes: $changes) {
        title
        rate
        currency
        }
      }
    `
    const data = await graphQLFetch(query, {_id, changes}, this.showError);
    if (!data) {
      this.showError("Unable to save changes")
    }
  }

  async loadCompany() {
    const query = `
    query {
      company {
        _id
        name
      }
    }`;
    const data = await graphQLFetch(query, {}, this.showError);
    if (data) {
      this.setState({ companies: data.company })
    } else {
      this.showError("Unable to load data")
    }
  }
  async loadSkills() {
    const query = `
    query getSkills {
      skill {
        _id
        name
      }
    }`
    const data = await graphQLFetch(query, {}, this.showError);
    if (data) {
      this.setState({ availSkills: data.skill })
    } else {
      this.showError("Unable to load data")
    }
  }

  async loadRep(cid) {
    const query = `
    query getRep($cid: ID) {
      representative(cid: $cid) {
        _id
        cid
        email
        phone
        name
      }
    }`;
    const data = await graphQLFetch(query, { cid }, this.showError);
    if (data) {
      this.setState({ representatives: data.representative });
    } else {
      this.showError("Unable to load data")
    }
  }

  async loadLoc(cid) {
    const query = `
    query getLocations($cid: ID) {
      location(cid: $cid) {
        _id
        cid
        city
        country
        address
        postcode
      }
    }`;
    const data = await graphQLFetch(query, { cid }, this.showError);
    if (data) {
      this.setState({ locations: data.location });
    } else {
      this.showError("Unable to load data")
    }
  }

  async loadDetails(_id) {
    const query = `query getJob($_id: ID) {
      job(_id: $_id) {
        _id
        personel
        rate
        currency
        description
        skills {_id}
        agent { name _id cid email phone}
        representative { name _id cid email phone}
        location { country address postcode city cid _id}
        title
        company {_id name}
        status
        start
        end
      }
    }`;

    const data = await graphQLFetch(query, { _id }, this.showError);
    if (data) {
      const setData = data.job[0]
      this.setState({jobId: setData._id})
      this.setState({companyValue: setData.company._id})
      this.setState({repValue: setData.representative._id})
      this.setState({locValue: setData.location._id})
      this.setState({title: setData.title})
      this.setState({personel: setData.personel})
      this.setState({rate: setData.rate})
      this.setState({currency: setData.currency})
      this.setState({description: setData.description})
      this.setState({status: setData.status})
      this.setState({start: setData.start})
      this.setState({end: setData.end})
      this.setState({skills: setData.skills.map(function(skill) { return skill._id; })})
    } else {
      this.showError("Unable to load data")
    }
  }

  render() {
    const { toastVisible, toastMessage, toastType } = this.state;
    const {
      companies,
      companyValue,
      locValue, repValue,
      locations,
      representatives,
      title,
      personel,
      jobId,
      rate,
      currency,
      description,
      availSkills,
      skills,
      status,
      errors
    } = this.state 
    console.log(this.state);
    const start = this.state.start.toISOString().split("T")[0]
    const end = this.state.end.toISOString().split("T")[0]
    const showTooltip = function(text) {
      return (
        <Tooltip id="show-tooltip" placement="top">{text}</Tooltip>
      )
    }
    return(
      <div>
      {jobId ? (
      <Panel>
        <Panel.Heading>
          <LinkContainer to={`/details/${this.state.id}`}>
            <OverlayTrigger delayShow={1000} overlay={showTooltip("Fullscreen view")}>
              <Button bsStyle="info" bsSize="small">
                <Glyphicon glyph="glyphicon glyphicon-resize-full" />
              </Button>
            </OverlayTrigger>
          </LinkContainer>
          {' '}
          <LinkContainer to={`/jobs/${this.state.id}`}>
            <OverlayTrigger delayShow={1000} overlay={showTooltip("Panel view")}>
              <Button bsStyle="success" bsSize="small">
                <Glyphicon glyph="glyphicon glyphicon-resize-small" />
              </Button>
            </OverlayTrigger>
          </LinkContainer>
        </Panel.Heading>
        <Form horizontal name="jobEdit" onSubmit={this.onSubmitHandle}>
        {companies && companyValue &&
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Company</Col>
              <Col sm={8}>
                <FormControl
                  componentClass="select"
                  name="company"
                  id="company"
                  value={companyValue}
                  onChange={this.onCompanySelectedHandler}
                >
                  {this.createOptions("companies", companies)}
                </FormControl>
                {errors.company && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("company")}>{errors.company}</Alert>}
              </Col>
              <Col sm={2} />
            </FormGroup>}
            {representatives && repValue && 
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Representative</Col>
                <Col sm={8}>
                  <FormControl
                    componentClass="select"
                    name="repValue"
                    id="repValue"
                    value={repValue}
                    onChange={this.onValueChange}
                  >
                    {this.createOptions("rep", representatives)}
                  </FormControl>
                  {errors.representative && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("representative")}>{errors.representative}</Alert>}
                </Col>
                <Col sm={2} />
              </FormGroup>}
            {locations && locValue &&
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Location</Col>
                <Col sm={8}>
                  <FormControl
                    componentClass="select"
                    name="locValue"
                    id="locValue"
                    value={locValue}
                    onChange={this.onValueChange}
                  >
                    {this.createOptions("loc", locations)}
                  </FormControl>
                  {errors.location && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("location")}>{errors.location}</Alert>}
                </Col>
                <Col sm={2} />
              </FormGroup>}
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Title</Col>
            <Col sm={8}>
              <FormControl
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={this.onValueChange}
              />
              {errors.title && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("title")}>{errors.title}</Alert>}
            </Col>
            <Col sm={2} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Personel</Col>
            <Col sm={8}>
              <FormControl
                type="number"
                name="personel"
                placeholder="Personel"
                value={personel}
                step="1"
                onChange={this.onValueChange}
              />
              {errors.personel && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("personel")}>{errors.personel}</Alert>}
            </Col>
            <Col sm={2} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Rate /h</Col>
            <Col sm={8}>
              <FormControl
                type="number"
                name="rate"
                placeholder="Rate"
                value={rate}
                step=".01"
                onChange={this.onValueChange}
              />
              {errors.rate && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("rate")}>{errors.rate}</Alert>}
            </Col>
            <Col sm={2} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Currency</Col>
            <Col sm={8}>
              <FormControl
                  componentClass="select"
                  name="currency"
                  id="currency"
                  value={currency}
                  onChange={this.onValueChange}
                >
                  <option value="PLN">PLN</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </FormControl>
                {errors.currency && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("currency")}>{errors.currency}</Alert>}
            </Col>
            <Col sm={2} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Description</Col>
            <Col sm={8}>
              <FormControl
                type="textarea"
                name="description"
                placeholder="Description"
                value={description}
                onChange={this.onValueChange}
              />
              {errors.description && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("description")}>{errors.description}</Alert>}
            </Col>
            <Col sm={2} />
          </FormGroup>
          {availSkills &&
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>Desired skills</Col>
              <Col sm={8}>
                <FormControl
                  componentClass="select"
                  name="skills"
                  id="skills"
                  value={skills}
                  multiple
                  onChange={this.onValueChange}
                >
                  {this.createOptions("skills", availSkills)}
                </FormControl>
                {errors.skills && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("skills")}>{errors.skills}</Alert>}
              </Col>
              <Col sm={2} />
            </FormGroup>}
            <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Status</Col>
            <Col sm={8}>
              <FormControl
                  componentClass="select"
                  name="status"
                  id="status"
                  value={status}
                  onChange={this.onValueChange}
                >
                  <option value="New">New</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Signed">Signed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Closed">Closed</option>
                </FormControl>
                {errors.status && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("status")}>{errors.status}</Alert>}
            </Col>
            <Col sm={2} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Start</Col>
            <Col sm={8}>
              <FormControl
                type="date"
                name="start"
                placeholder="Start"
                onKeyDown={() => false}
                value={start}
                onChange={this.onValueChange}
                onKeyDown={(e) => e.preventDefault()}
              />
              {errors.start && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("start")}>{errors.start}</Alert>}
            </Col>
            <Col sm={2} />
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>End</Col>
            <Col sm={8}>
              <FormControl
                type="date"
                name="end"
                placeholder="End"
                value={end}
                onChange={this.onValueChange}
                onKeyDown={(e) => e.preventDefault()}
              />
              {errors.end && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("end")}>{errors.end}</Alert>}
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
      ) : (
        <p>Job with this id not found.</p>
      )  
    }
    <Toast
      showing={toastVisible}
      onDismiss={this.dismissToast}
      bsStyle={toastType}
    >
      {toastMessage}
    </Toast>
    </div>
  )}
}