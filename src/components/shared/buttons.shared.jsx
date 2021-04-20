import React from 'react';
import { Col, FormGroup, Button } from 'react-bootstrap';

export default function(props) {
    const { textButton, styleButton, type } = props;
    if (type === 'submit') {
        return (
            <FormGroup>
                <Col sm={3} />
                <Col sm={6}>
                  <Button type={type} bsStyle={styleButton}>
                      {textButton}
                    </Button>
                </Col>
                <Col sm={3} />
          </FormGroup>
        )
    }
}