import React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

export default class SkillAdd extends React.Component {
    constructor() {
      super();
      this.onSkillSubmitHandler = this.onSkillSubmitHandler.bind(this);
    }
    onSkillSubmitHandler(e) {
      e.preventDefault();
      const form = document.forms.skillAdd;
      const skill = {
        skill: {
          name: form.name.value,
        }
      };
      this.props.createSkill(skill);
      form.name.value = '';
    }
    render() {
      return (
        <Form horizontal name="skillAdd" onSubmit={this.onSkillSubmitHandler}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Skill name</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Provide skill name"
                  onChange={this.onCompanySelectedHandler}
                />
                <Button type="submit" bsStyle="success">Add skill</Button>
              </Col>
            <Col sm={3} />
          </FormGroup>
        </Form>
      );
    }
  }