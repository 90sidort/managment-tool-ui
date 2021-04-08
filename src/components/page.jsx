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
                    <LinkContainer exact to ="/skills">
                      <NavItem>Skills</NavItem>
                    </LinkContainer>
                    <LinkContainer exact to ="/comps">
                      <NavItem>Companies</NavItem>
                    </LinkContainer>
                    <LinkContainer exact to ="/reps">
                      <NavItem>Representatives</NavItem>
                    </LinkContainer>
                    <LinkContainer exact to ="/locs">
                      <NavItem>Locations</NavItem>
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
  );
}

export default class Page extends React.Component {
  constructor(){
    super()
    this.state = {
      token: null,
      userId: null,
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  login (token, userId, tokenExpiration) {
    this.setState({ token, userId });
  };

  logout() {
    this.setState({ token: null, userId: null });
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
          <Grid fluid>
            <Contents />
          </Grid>
          <Footer />
        </AuthContext.Provider>
      </React.Fragment>
      );
    }
}