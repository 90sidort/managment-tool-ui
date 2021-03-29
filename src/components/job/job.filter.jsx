import React from 'react';
import {ButtonToolbar, Glyphicon, Button, FormGroup, FormControl, ControlLabel, InputGroup, Row, Col} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import URLSearchParams from 'url-search-params';

class JobsFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      status: params.get('status') || '',
      company: params.get('company') || '',
      personMax: params.get('personMax') || '',
      personMin: params.get('personMin') || '',
      title: params.get('title') || '',
      changed: false,
    };
    this.onStatusChange = this.onStatusChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
    this.onCompanySelectedHandler = this.onCompanySelectedHandler.bind(this);
    this.onChangePersonMin = this.onChangePersonMin.bind(this);
    this.onChangePersonMax = this.onChangePersonMax.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  onStatusChange(e) {
    this.setState({ status: e.target.value, changed: true });
  }

  onCompanySelectedHandler(e) {
    console.log(e.target.value);
    this.setState({ company: e.target.value, changed: true });
  }

  onChangePersonMin(e) {
    const personString = e.target.value;
    if (personString.match(/^\d*$/)) {
      this.setState({ personMin: e.target.value, changed: true });
    }
  }

  onChangePersonMax(e) {
    const personString = e.target.value;
    if (personString.match(/^\d*$/)) {
      this.setState({ personMax: e.target.value, changed: true });
    }
  }

  onTitleChange(e) {
    const title = e.target.value.trim()
    this.setState({title, changed: true})
  }

  showOriginalFilter() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      status: params.get('status') || '',
      company: params.get('company') || '',
      personMax: params.get('personMax') || '',
      personMin: params.get('personMin') || '',
      title: params.get('title') || '',
      changed: false,
    });
  }

  applyFilter() {
    const { status, company, personMin, personMax, title } = this.state;
    const history = this.props.history;
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (company) params.set('company', company)
    if (personMin) params.set('personMin', personMin);
    if (personMax) params.set('personMax', personMax);
    if (title) params.set('title', title);
  
    const search = params.toString() ? `?${params.toString()}` : '';
    console.log('search',search);
    history.push({ pathname: '/jobs', search });
    }

  createCompItems() {
    const options = [];
    const comps = this.props.comp;
    for (let i = 0; i < comps.length; i++) {
      options.push(
        <option key={i} value={comps[i]._id}>
          {comps[i].name}
        </option>
      );
    }
    return options;
  }

  render() {
    console.log(this.props);
    const companies = this.props.comp
    const company = this.state.company
    const status = this.state.status;
    const changed = this.state.changed
    const personMin = this.state.personMin
    const personMax = this.state.personMax
    const title = this.state.title
    return (
      <div>
      <Row>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <ControlLabel>Status:</ControlLabel>
            <FormControl
                componentClass="select"
                value={status}
                onChange={this.onStatusChange}
              >
                <option value="">All</option>
                <option value="New">New</option>
                <option value="Assigned">Assigned</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Signed">Signed</option>
                <option value="Ongoing">Ongoind</option>
                <option value="Closed">Closed</option>
              </FormControl>
          </FormGroup>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
        {companies &&<FormGroup>
          <ControlLabel>Company:</ControlLabel>
          <FormControl
              componentClass="select"
              value={company}
              onChange={this.onCompanySelectedHandler}
            >
              <option value="">All</option>
              {this.createCompItems()}
            </FormControl>
        </FormGroup>}
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              value={title}
              onChange={this.onTitleChange}
            />
          </FormGroup>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
        <FormGroup>
            <ControlLabel>Personel:</ControlLabel>
            <InputGroup>
              <FormControl value={personMin} onChange={this.onChangePersonMin} />
              <InputGroup.Addon>-</InputGroup.Addon>
              <FormControl value={personMax} onChange={this.onChangePersonMax} />
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={4} md={3} lg={2}>
          <ButtonToolbar>
            <Button
              type="button"
              bsStyle="primary"
              onClick={this.applyFilter}
            >
              <Glyphicon glyph="glyphicon glyphicon-ok"/>
            </Button>
            <Button
              type="button"
              bsStyle="default"
              onClick={this.showOriginalFilter}
              disabled={!changed}
            >
              <Glyphicon glyph="glyphicon glyphicon-remove"/>
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </div>);
  }
}


export default withRouter(JobsFilter)