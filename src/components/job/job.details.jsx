import React from 'react';
import {
  Button,
  Col,
  Glyphicon,
  Grid,
  OverlayTrigger,
  Panel,
  Row,
  Tooltip
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import withToast from '../toast.wrapper.jsx'
import graphQLFetch from '../../utils/graphqlFetch';
import { deleteJobQuery, getJobQuery } from '../../utils/queries/job.queries.js';

class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
        id : this.props.match.params.id,
        toastVisible: false,
        toastMessage: ' ',
        toastType: 'success',
    };
    this.deleteJob = this.deleteJob.bind(this)
  }

  componentDidMount() {
    this.loadDetails(this.state.id);
  }

  async loadDetails(_id) {
    const { showError } = this.props
    const query = getJobQuery;
    const data = await graphQLFetch(query, { _id }, showError);
    if (data) {
      this.setState({ details: data.job });
    } else {
      showError('Unable to load data')
    }
  }

  async deleteJob(_id) {
    const { showError } = this.props
    const query = deleteJobQuery;
    const data = await graphQLFetch(query, { _id }, showError);
    if (data) {
      this.props.history.push("/jobs")
    } else {
      showError('Unable to delete')
    }
  }

  render() {
    const details = this.state.details[0]
    const showTooltip = function(text) {
      return (
        <Tooltip id="show-tooltip" placement="top">{text}</Tooltip>
      )
    }
    return (
      <div>
        <Panel>
        <Panel.Heading>
          <LinkContainer to={`/edit/${this.state.id}`}>
            <OverlayTrigger delayShow={1000} overlay={showTooltip("Edit job")}>
              <Button bsStyle="success" bsSize="small">
                <Glyphicon glyph="glyphicon glyphicon-pencil" />
              </Button>
            </OverlayTrigger>
          </LinkContainer>
          <LinkContainer to={`/jobs/${this.state.id}`}>
            <OverlayTrigger delayShow={1000} overlay={showTooltip("Panel view")}>
              <Button bsStyle="info" bsSize="small">
                <Glyphicon glyph="glyphicon glyphicon-resize-small" />
              </Button>
            </OverlayTrigger>
          </LinkContainer>
          <OverlayTrigger delayShow={1000} overlay={showTooltip("Delete job")}>
              <Button bsStyle="danger" bsSize="small" onClick={() => {this.deleteJob(this.state.id)}}>
                <Glyphicon glyph="glyphicon glyphicon-remove-circle" />
              </Button>
            </OverlayTrigger>
        </Panel.Heading>
        {details && (
          <Grid>
            <Row>
              <Col sm={4}/>
                <Col sm={6}>
                  <h2>{details.title}</h2>
                </Col>
              <Col sm={2} />
            </Row>
            <hr/>
            <Row>
              <Col sm={4}>
                <u>Company:</u><h4>{details.company.name}</h4>
              </Col>
              <Col sm={4}>
              <u>Personel:</u><h4>{details.personel}</h4>
              </Col>
              <Col sm={4}>
                <u>Rate:</u><h4>{details.rate} {details.currency} \h</h4>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col sm={4}>
              <u>Country:</u><h4>{details.location.country}</h4>
              </Col>
              <Col sm={4}>
              <u>City:</u><h4>{details.location.city}, {details.location.postcode}</h4>
              </Col>
              <Col sm={4}>
              <u>Address:</u><h4>{details.location.address}</h4>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col sm={4}>
              <u>Representative:</u><h4>{details.representative.name}</h4>
              </Col>
              <Col sm={4}>
              <u>Email:</u><h4>{details.representative.email}</h4>
              </Col>
              <Col sm={4}>
              <u>Phone:</u><h4>{details.representative.phone}</h4>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col sm={4}>
              <u>Agent:</u><h4>{details.agent ? details.agent.name : "Assign an agent"}</h4>
              </Col>
              <Col sm={4}>
              <u>Email:</u><h4>{details.agent ? details.agent.email : "tbd"}</h4>
              </Col>
              <Col sm={4}>
              <u>Phone:</u><h4>{details.agent ? details.agent.phone : "tbd"}</h4>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col sm={4}>
              <u>Status:</u><h4>{details.status}</h4>
              </Col>
              <Col sm={4}>
              <u>Start:</u><h4>{details.start.toISOString().split("T")[0]}</h4>
              </Col>
              <Col sm={4}>
              <u>End:</u><h4>{details.end.toISOString().split("T")[0]}</h4>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col sm={12}>
                <u>Details:</u><h4>{details.description}</h4>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col sm={12}>
                <u>Skills:</u>
                <div>
                  <ul>
                    {details.skills.length > 0 ? (details.skills.map((skill) => <li key={skill._id}> - {skill.name}</li>) ) : ("Provide skills")}
                  </ul>
                </div>
              </Col>
            </Row>
          </Grid>
        )}
        </Panel>
      </div>
    );
  }
}

const JobDetailsWithToast = withToast(JobDetails);
export default JobDetailsWithToast;