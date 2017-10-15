// MAIN MENU
import React from 'react';
import {connect} from 'react-redux';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import {Nav, NavItem, Navbar} from 'react-bootstrap';

// Update REACT PropTypes
import PropTypes from 'prop-types';

class Menu extends React.Component {
  render() {
    if (this.props.user) {
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
              <LinkContainer to="transfer" >
                <NavItem eventKey={1}>Transfer</NavItem>
              </LinkContainer>
              <LinkContainer to="admin">
                <NavItem eventKey={2}>Admin</NavItem>
              </LinkContainer>
              <LinkContainer to="logout">
                <NavItem eventKey={3}>Logout</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

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
            <LinkContainer to="login">
              <NavItem eventKey={1}>Login</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user,
  };
}

Menu.propTypes = {
  user: PropTypes.any,
};

export default connect(mapStateToProps)(Menu);
