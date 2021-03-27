import React from 'react'
import { Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'

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
      const desc = this.state.job.description
      const showTooltip = function(text) {
        return (
          <Tooltip id="show-tooltip" placement="top">{text}</Tooltip>
        )
      }
      return (
          <div>
              <OverlayTrigger delayShow={1000} overlay={showTooltip("Close panel")}>
                <NavLink to="/"><Button bsStyle="warning"><Glyphicon glyph="glyphicon glyphicon-chevron-left" /></Button></NavLink>
              </OverlayTrigger>
              {' '}
              <Link to={`/details/${this.state.job._id}`}>Fullscreen view</Link>
              {' '}
              <Link to={`/edit/${this.state.job._id}`}>Edit</Link>
              {' '}
              <OverlayTrigger delayShow={1000} overlay={showTooltip("Delete job")}>
                <Button type="button" bsStyle="danger" onClick={() => {this.props.deleteJob(this.state.job._id)}}>
                  <Glyphicon glyph="glyphicon glyphicon-remove-circle" />
                </Button>
              </OverlayTrigger>
              {' '}
              <p>{desc}</p>
          </div>
      )
  }
}