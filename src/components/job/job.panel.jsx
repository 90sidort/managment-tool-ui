import React from 'react'
import {
  Button,
  Glyphicon,
  OverlayTrigger,
  Tooltip,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Panel
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'
import withToast from '../toast.wrapper.jsx';

import graphQLFetch from '../../utils/graphqlFetch'
import { jobListQuery } from '../../utils/queries/job.queries.js'

class JobPanel extends React.Component {
    constructor(){
      super()
      this.state = {
          job: {},
      }
    }

    componentDidMount() {
      this.loadData()
    }

    componentDidUpdate(prevProps) {
      const { match: { params: { id: prevId } } } = prevProps;
      const { match: { params: { id } } } = this.props;
      if (prevId !== id) {
        this.loadData();
      }
    }

    async loadData() {
      const _id = this.props.match.params.id
      const { showError } = this.props
      const query = jobListQuery;
        const data = await graphQLFetch(query, { _id }, showError);
        if (data) {
          this.setState({ job: data.job.jobs[0] });
        } else {
          showError('Unable to load data')
          this.setState({ job: {} });
        }
    }

  render(){
    const { previous : { search } } = this.props
    const data = this.state.job
    const showTooltip = function(text) {
      return (
        <Tooltip id="show-tooltip" placement="top">{text}</Tooltip>
      )
    }
    return (
      <Panel>
          <Panel.Heading>
            <OverlayTrigger delayShow={1000} overlay={showTooltip("Close panel")}>
              <NavLink to={`/jobs/${search}`}>
                <Button bsStyle="warning" bsSize="small">
                  <Glyphicon glyph="glyphicon glyphicon-chevron-left" />
                </Button>
              </NavLink>
            </OverlayTrigger>
            <LinkContainer to={{pathname: `/details/${this.state.job._id}`, query: `/jobs/${search}`}}>
              <OverlayTrigger delayShow={1000} overlay={showTooltip("Fullscreen view")}>
                <Button bsStyle="info" bsSize="small">
                  <Glyphicon glyph="glyphicon glyphicon-resize-full" />
                </Button>
              </OverlayTrigger>
            </LinkContainer>
            <LinkContainer to={{pathname: `/edit/${this.state.job._id}`, query: `/jobs/${search}`}}>
              <OverlayTrigger delayShow={1000} overlay={showTooltip("Edit job")}>
                <Button bsStyle="success" bsSize="small">
                  <Glyphicon glyph="glyphicon glyphicon-pencil" />
                </Button>
              </OverlayTrigger>
            </LinkContainer>
            <OverlayTrigger delayShow={1000} overlay={showTooltip("Delete job")}>
              <Button bsStyle="danger" bsSize="small" onClick={() => {this.props.deleteJob(this.state.job._id)}}>
                <Glyphicon glyph="glyphicon glyphicon-remove-circle" />
              </Button>
            </OverlayTrigger>
          </Panel.Heading>
          <Row className="show-grid">
            <Col xs={12} md={8}>
            <ListGroup style={ { wordBreak: 'break-all' }}>
                {data.title && <ListGroupItem>Title: {data.title}</ListGroupItem>}
                {data.description && <ListGroupItem>{data.description}</ListGroupItem>}
                {data.status && <ListGroupItem>Status: {data.status}</ListGroupItem>}
                {data.start && <ListGroupItem>From: {data.start.toISOString().split("T")[0]}</ListGroupItem>}
                {data.end && <ListGroupItem> To: {data.end.toISOString().split("T")[0]}</ListGroupItem>}
                {data.personel && <ListGroupItem>Personel: {data.personel}</ListGroupItem>}
                {data.company && <ListGroupItem>Company: {data.company.name}</ListGroupItem>}
                {data.rate && <ListGroupItem>Rate/ h: {data.rate} {data.currency}</ListGroupItem>}
                {data.location && 
                  <ListGroupItem style={{whiteSpace: "pre"}}>
                    {`Location:
                    ${data.location.country},
                    ${data.location.city}, ${data.location.postcode}
                    ${data.location.address}`}
                  </ListGroupItem>}
                {data.representative && 
                <ListGroupItem style={{whiteSpace: "pre"}}>
                  {`Representative:
                  ${data.representative.name},
                  ${data.representative.email},
                  ${data.representative.phone}`}
                </ListGroupItem>}
              </ListGroup>
            </Col>
          </Row>
      </Panel>
    )
  }
}

const JobPanelWithToast = withToast(JobPanel);
export default JobPanelWithToast;