import React from 'react';
import { Glyphicon, Grid, MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './content.jsx';

function NavBar() {
  return (
    <Navbar fluid expand="lg">
      <Navbar.Brand>Job Tracker</Navbar.Brand>
      <Nav>
        <LinkContainer exact to ="/">
          <NavItem>Jobs</NavItem>
        </LinkContainer>
        <LinkContainer exact to ="/about">
          <NavItem>About</NavItem>
        </LinkContainer>
      </Nav>
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
      </Nav>
    </Navbar>
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

export default function Page() {
  return (
    <div>
      <NavBar />
      <Grid fluid>
        <Contents />
      </Grid>
      <Footer />
    </div>
  );
}