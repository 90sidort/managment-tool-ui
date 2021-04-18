import React from "react";

import graphQLFetch from "../../utils/graphqlFetch";
import { addUserQuery, loginQuery } from "../../utils/queries/user.queries";
import AuthContext from "../../context/auth.context.js";
import Signin from "../auth/signin.jsx"
import Signup from "../auth/signup.jsx"
import withToast from '../toast.wrapper.jsx';

class AuthPage extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      email: "",
      password: "",
      name: "",
		  surname: "",
      phone: "",
      position: "",
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.onSignChange = this.onSignChange.bind(this);
  }

  onValueChange(e){
    const {value, name} = e.target
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  async login() {
    const { showError, history } = this.props
    const {email, password} = this.state;
    const query = loginQuery;
    const data = await graphQLFetch(query, {email, password}, showError);
    if (data) {
      if (data.login.token) {
        this.context.login(
          data.login.token,
          data.login.userId,
          data.login.tokenExpiration
        );
        history.push("/jobs")
      } else {
        showError("Something went wrong. Check connection and try again.")
      }
    } else {
      showError("Check your credentials and try again.")
    }
  }

  async signup() {
    const { showError } = this.props
    const { email, password, name, surname, phone, position } = this.state;
    const query = addUserQuery;
    const data = await graphQLFetch(query, {user: { email, password, name, surname, phone, position }}, showError);
    if (data) {
      this.setState({
        isLogin: true,
        email: "",
        password: "",
        name: "",
        surname: "",
        phone: "",
        position: ""
      })
    } else {
      showError("Something went wrong. Check connection and try again.")
    }
  }

  onSubmitHandle(e){
    const { isLogin } = this.state;
    e.preventDefault()
    if (isLogin) {
      this.login()
    }
    else this.signup()
  }

  onSignChange(){
    const { isLogin } = this.state;
    this.setState({isLogin: !isLogin});
  }

  render() {
    const {email, password, isLogin, name, surname, phone, position} = this.state;
    return (
      <div>
        {isLogin ? 
        (<Signin
          email={email}
          password={password}
          isLogin={isLogin}
          onSignChange={this.onSignChange}
          onSubmitHandle={this.onSubmitHandle}
          onValueChange={this.onValueChange}
        />)
        : 
        (<Signup
          name={name}
          surname={surname}
          phone={phone}
          position={position}
          email={email}
          password={password}
          isLogin={isLogin}
          onSignChange={this.onSignChange}
          onSubmitHandle={this.onSubmitHandle}
          onValueChange={this.onValueChange}
        />
      )}
      </div>
    );
  }
}

const AuthWithToast = withToast(AuthPage);
export default AuthWithToast;
