import React from 'react';
import { Col, ControlLabel, FormGroup, FormControl, Alert } from 'react-bootstrap';

export default function (props) {
    const {
        nameElement,
        idElement,
        placeholderElement,
        errorsElement,
        dismissHandler,
        valueElement,
        onChangeHandler,
        optionsElement
    } = props
    const nameTitle = nameElement.charAt(0).toUpperCase() + nameElement.slice(1)
    if (props.typeElement === "text") {
        return (
            <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>{nameTitle}</Col>
                <Col sm={6}>
                    <FormControl
                        componentClass="input"
                        type="text"
                        name={nameElement}
                        id={idElement}
                        placeholder={placeholderElement}
                    />
                    {errorsElement[nameElement] && <Alert bsStyle="danger" onDismiss={() => dismissHandler(`${nameElement}`)}>{errorsElement[nameElement]}</Alert>}
                </Col>
                <Col sm={3} />
          </FormGroup>
        )
    } else if (props.typeElement === "select") {
        const options = optionsElement.map((option, i) => <option key={i} value={option}>{option}</option>)
        options.push(<option key={-1} value={-1} disabled>{placeholderElement}</option>)
        return (
            <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>{nameTitle}</Col>
                <Col sm={6}>
                    <FormControl
                        componentClass="select"
                        name={nameElement}
                        id={idElement}
                        defaultValue={-1}
                    >
                        {options}
                    </FormControl>
                    {errorsElement[nameElement] && <Alert bsStyle="danger" onDismiss={() => dismissHandler(`${nameElement}`)}>{errorsElement[nameElement]}</Alert>}
                </Col>
                <Col sm={3} />
            </FormGroup>
        )
    }
}