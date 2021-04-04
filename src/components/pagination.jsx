import React from 'react'
import { Col, ControlLabel, FormControl, FormGroup, Row } from 'react-bootstrap';

export default function(props) {
    console.log(props);
    const {pages, currentPage, changer} = props
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
          <Col sm={10}/>
        </FormGroup>
        </Row>
        <hr />
      </div>
    )
}