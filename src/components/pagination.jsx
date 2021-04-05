import React from 'react'
import { Col, ControlLabel, FormControl, FormGroup, Row } from 'react-bootstrap';

export default function(props) {
    const {pages, currentPage, changer, records} = props
    const paginator = []
    for(let i = 0; i < pages; i++) {
      paginator.push((
        <option key={i} value={i+1}>
        {i+1}
      </option>
      ))
    }
    return (
      <div>
        <hr />
        <Row>
        <FormGroup>
          <Col sm={1} componentClass={ControlLabel} style={{paddingTop: "0.35%", paddingRight: "0%", maxWidth: "5%"}}>Page</Col>
          <Col sm={1} style={{paddingLeft: "0%"}}>
            <FormControl
              componentClass="select"
              name="pages"
              id="pages"
              value={currentPage}
              onChange={(e) => changer(e)}
            >
              {paginator}
            </FormControl>
          </Col>
          <Col sm={1} componentClass={ControlLabel} style={{paddingTop: "0.35%", paddingRight: "0%", maxWidth: "7%"}}>Records</Col>
          <Col sm={1} style={{paddingLeft: "0.5%"}}>
            <FormControl
              componentClass="select"
              name="records"
              id="records"
              value={records}
              onChange={(e) => changer(e)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </FormControl>
          </Col>
          <Col sm={8}/>
        </FormGroup>
        </Row>
        <hr />
      </div>
    )
}