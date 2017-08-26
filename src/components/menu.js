"use strict"

import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
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
            <LinkContainer to="/">
              <NavItem eventKey={1}>Team</NavItem>
            </LinkContainer>
            <LinkContainer to="/">
              <NavItem eventKey={2}>My Account</NavItem>
            </LinkContainer>
            <LinkContainer to="transfer">
              <NavItem eventKey={3}>Transfer</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="about">
              <NavItem eventKey={1}>About</NavItem>
            </LinkContainer>
            <LinkContainer to="login">
              <NavItem eventKey={2}>Login</NavItem>
            </LinkContainer>
            <LinkContainer to="admin">
              <NavItem eventKey={3}>Admin</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;
