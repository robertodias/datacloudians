"use strict"

import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';

class Menu extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            DC$ <span className="beta">beta</span>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/">
              <NavItem eventKey={1}>Team</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="about">
              <NavItem eventKey={2}>About</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>

            <LinkContainer to="transfer">
              <NavItem eventKey={1}>Transfer</NavItem>
            </LinkContainer>
            <LinkContainer to="login">
              <NavItem eventKey={2}>Login</NavItem>
            </LinkContainer>
            <LinkContainer to="logout">
              <NavItem eventKey={3}>Logout</NavItem>
            </LinkContainer>
            <LinkContainer to="admin">
              <NavItem eventKey={4}>Admin</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;
