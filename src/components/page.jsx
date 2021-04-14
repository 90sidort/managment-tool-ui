import React from 'react';
import { Glyphicon, Grid, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import AuthContext from '../context/auth.context.js';

import Contents from './content.jsx';

function NavBar() {
  return (
    <AuthContext.Consumer>
      {(context) => {
        console.log(context);
        return (
          <Navbar fluid expand="lg">
            <Navbar.Brand>Job Tracker</Navbar.Brand>
            <Nav>
            {context.token &&
            (<LinkContainer exact to ="/">
                <NavItem>Jobs</NavItem>
              </LinkContainer>)}
            {context.token &&
              (<LinkContainer exact to ="/reports">
                <NavItem>Reports</NavItem>
              </LinkContainer>)}
              {!context.token &&
              (<LinkContainer exact to="/auth">
                <NavItem>Authenticate</NavItem>
              </LinkContainer>)}
              {context.token &&
              (<LinkContainer exact to ="/about">
                <NavItem>About</NavItem>
              </LinkContainer>)}
            </Nav>
            {context.token && (
              <Nav pullRight>
                <Navbar.Text>Admin panel</Navbar.Text>
                  <NavDropdown
                    id="user-dropdown"
                    title={<Glyphicon glyph="option-vertical" />}
                    noCaret
                  >
                    <LinkContainer exact to = "/skills">
                      <NavItem>Skills</NavItem>
                    </LinkContainer>
                    <LinkContainer exact to ="/company">
                      <NavItem>Companies</NavItem>
                    </LinkContainer>
                  </NavDropdown>
                <LinkContainer exact to="/auth">
                  <NavItem onClick={context.logout}><Glyphicon glyph="glyphicon glyphicon-log-out" />{' '}Logout</NavItem>
                </LinkContainer>
             </Nav>
            )}
          </Navbar>
        )
      }}
    </AuthContext.Consumer>
  );
}

function Footer() {
  return (
    <div style={{paddingTop: "10px"}}>
      <div style={{
        display: "block",
        padding: "20px",
        height: "60px",
        width: "100%"
      }} /> 
      <div style={{
        fontSize: "100%",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "white",
        paddingBottom: "0px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "5%%",
        width: "100%"
      }}>
        <small>
          <p className="text-center">
            Managment tool to cope with jobs, workers, housings and partners. All you need to run a succesfull work agency.
            {' '}
          </p>
          <p className="text-center">
            <a href="https://github.com/90sidort">
              Author GitHub repository
            </a>
          </p>
        </small>
      </div>
    </div>
  );
}

export default class Page extends React.Component {
  constructor(){
    super()
    this.state = {
      token: (JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).token)  || null,
      userId: (JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).userId) || null,
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  login (token, userId, tokenExpiration) {
    this.setState({ token, userId });
    localStorage.setItem('userData', JSON.stringify({userId, token}));
  };

  logout() {
    this.setState({ token: null, userId: null });
    localStorage.removeItem('userData');
  };
  render() {
    return (
      <React.Fragment>
        <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
          <NavBar />
          <Grid fluid style={{paddingBottom: "20%"}}>
            <Contents />
          </Grid>
          <Footer />
        </AuthContext.Provider>
      </React.Fragment>
      );
    }
}