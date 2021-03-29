import React from 'react'
import { Button, Glyphicon, OverlayTrigger, Tooltip, Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'

import graphQLFetch from '../../utils/graphqlFetch'

export default class JobPanel extends React.Component {
    constructor(){
      super()
      this.state = {
          job: {}
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
      console.log(_id);
      const query = `
      query getJob($_id: ID, $currency: String, $status: String) {
          job(_id: $_id, currency: $currency, status: $status) {
            _id
            description
            personel
            rate
            currency
            skills {_id, name}
            agent { name _id cid email phone}
            representative { name _id cid email phone}
            location { country address postcode city cid _id}
            title
            company {name}
            status
            start
            end
            created
          }
        }`;
        const data = await graphQLFetch(query, { _id });
        if (data) {
          console.log(data.job);
          this.setState({ job: data.job[0] });
        } else {
          this.setState({ job: {} });
        }
    }

  render(){
    const data = this.state.job
    const showTooltip = function(text) {
      return (
        <Tooltip id="show-tooltip" placement="top">{text}</Tooltip>
      )
    }
    console.log(123, data);
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={1} md={1} lg={1}>
          <OverlayTrigger delayShow={1000} overlay={showTooltip("Close panel")}>
            <NavLink to="/">
              <Button bsStyle="warning" bsSize="small">
                <Glyphicon glyph="glyphicon glyphicon-chevron-left" />
              </Button>
            </NavLink>
            </OverlayTrigger>
            <LinkContainer to={`/details/${this.state.job._id}`}>
              <OverlayTrigger delayShow={1000} overlay={showTooltip("Fullscreen view")}>
                <Button bsStyle="info" bsSize="small">
                  <Glyphicon glyph="glyphicon glyphicon-resize-full" />
                </Button>
              </OverlayTrigger>
            </LinkContainer>
            <LinkContainer to={`/edit/${this.state.job._id}`}>
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
          </Col>
          <Col xs={1} md={1} lg={1} />
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
      </Grid>      
    )
  }
}

{/* <h2>{data.title}</h2>
<p>{data.description}</p>
<ul className="list-group">
  <li className="list-group-item">Personel: {data.personel}</li>
  {data.company && <li className="list-group-item">Company: {data.company.name}</li>}
  <li className="list-group-item">Status: {data.status}</li>
  <li className="list-group-item">Rate /h: {data.rate}{' '}{data.currency}</li>
</ul> */}

