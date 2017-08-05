"use strict"

import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';


class Menu extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">DC$ <span className="beta">beta</span></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/">Team</NavItem>
            <NavItem eventKey={2} href="/">My Account</NavItem>
            <NavItem eventKey={3} href="/transfer">Transfer</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/about">About</NavItem>
            <NavItem eventKey={2} href="/admin">Admin</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;
