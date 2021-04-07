import React from "react";
import { ControlLabel, Form, FormGroup, Col, FormControl, Button } from "react-bootstrap";
import graphQLFetch from "../../utils/graphqlFetch";
import { loginQuery } from "../../utils/queries/user.queries";

import AuthContext from "../../context/auth.context.js";

class AuthPage extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      email: "",
      password: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
  }

  onValueChange(e){
    const {value, name} = e.target
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  async login() {
    const {email, password} = this.state;
    const query = loginQuery;
    const data = await graphQLFetch(query, {email, password});
    if (data) {
      console.log(data);
      console.log(this.context);
      if (data.login.token) {
        this.context.login(
          data.login.token,
          data.login.userId,
          data.login.tokenExpiration
        );
      }
    } else {
      console.log('Co jest kurła');
    }
  }

  onSubmitHandle(e){
    e.preventDefault()
    this.login()
  }

  render() {
    const {email, password} = this.state;
    return (
      <Form horizontal name="login" onSubmit={this.onSubmitHandle}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Email</Col>
          <Col sm={8}>
            <FormControl
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.onValueChange}
            />
            {/* {errors.company && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("company")}>{errors.company}</Alert>} */}
          </Col>
          <Col sm={2} />
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Password</Col>
          <Col sm={8}>
            <FormControl
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.onValueChange}
            />
            {/* {errors.company && <Alert bsStyle="danger" onDismiss={() => this.dismissValidation("company")}>{errors.company}</Alert>} */}
          </Col>
          <Col sm={2} />
        </FormGroup>
        <FormGroup>
            <Col sm={2} />
            <Col sm={8}>
             <Button bsStyle="success" type="submit">Login</Button>
            </Col>
            <Col sm={2} />
          </FormGroup>
      </Form>
    );
  }
}

export default AuthPage;
